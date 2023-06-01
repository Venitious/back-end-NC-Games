const express = require('express');
const cors = require('cors');

const { getCategories, getReviews, getReview, fetchEndPoints, getReviewsById, insertComment, updateVotes, getDeletedComment, getUsers } = require('./controllers');
const { handleServerErrors, handleCustomErrors, handlePsqlErrors } = require('./errorFunc');
const app = express(); 


app.use(cors());

app.use(express.json());

app.get('/api/categories', getCategories)

app.get('/api/reviews/:review_id', getReview)

app.get('/api/reviews', getReviews )

app.get('/api', fetchEndPoints)

app.post('/api/reviews/:review_id/comments', insertComment)

app.get('/api/reviews/:review_id/comments', getReviewsById)

app.patch('/api/reviews/:review_id', updateVotes)

app.delete('/api/comments/:comment_id', getDeletedComment)

app.get('/api/users', getUsers)

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)

module.exports = app; 