const express = require('express');
const { formatCategories, formatReviews, formatSingleReview, fetchEndPoints } = require('./controllers');
const { handleServerErrors, handleCustomErrors, handlePsqlErrors } = require('./errorFunc');
const app = express(); 

app.get('/api/categories', formatCategories)


app.get('/api/reviews/:review_id', formatSingleReview)

app.get('/api/reviews', formatReviews )

app.get('/api', fetchEndPoints)

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)

module.exports = app; 