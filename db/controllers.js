
const { fetchCategories, fetchReviews, fetchReview, fetchCommentsById, postCommentsById, patchVotes } = require("./models")
const fs = require('fs')
const endpoints = require('../endpoints.json')


exports.getCategories = (request, response, next) => {
    fetchCategories().then((returnedCategories) => {                
        response.status(200).send({categories: returnedCategories})
    })
    .catch((error)=> {
        next(error)
    })
}


exports.getReview = (request, response, next) => {
    const reviewID = request.params.review_id
    fetchReview(reviewID).then((returnedReview) => {     
        response.status(200).send({review: returnedReview})
    })
    .catch((error) => {
        next(error)
    })
}


exports.getReviews = (request, response, next) => {
    fetchReviews().then((returnedReviews) => {
        response.status(200).send({reviews:returnedReviews})
    })
    .catch((error) => {
        next(error)
    })
}


exports.fetchEndPoints = (request, response, next) => {
    response.status(200).send(endpoints)
}

exports.getReviewsById = (request, response, next) => {
    const queryId = request.params.review_id;
    fetchCommentsById(queryId).then((returnedComments) => {
        response.status(200).send({comments:returnedComments})
    })
    .catch((error) => {
        next(error)
    })
}


exports.insertComment = (request, response, next) => {
    const sentPostRequest = request.body
    const review_id = request.params
    postCommentsById(sentPostRequest, review_id)
    .then((insertedComment) => {
        response.status(201).send({newComment: insertedComment })
    })
    .catch((error) => {
        next(error)
    })
}

exports.updateVotes = (request, response, next) => {
    const votes = request.body.inc_votes
    const review_id = request.params.review_id
    patchVotes(votes, review_id)
    .then((updatedReview) => {
        response.status(201).send({updatedReview: updatedReview })
    })
}
    
