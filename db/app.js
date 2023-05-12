const express = require('express');
const { formatCategories, formatReviews, formatSingleReview, fetchEndPoints, insertComment } = require('./controllers');
const { handleServerErrors, handleCustomErrors, handlePsqlErrors } = require('./errorFunc');
const app = express(); 

app.use(express.json());

app.get('/api/categories', formatCategories)

app.get('/api/reviews/:review_id', formatSingleReview)

app.get('/api/reviews', formatReviews )

app.get('/api', fetchEndPoints)

app.post('/api/reviews/:review_id/comments', insertComment)

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)

module.exports = app; 