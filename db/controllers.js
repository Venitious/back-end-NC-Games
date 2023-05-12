const { fetchCategories, fetchReviews, fetchReview, postCommentsById } = require("./models")
const fs = require('fs')
const endpoints = require('../endpoints.json')


exports.formatCategories = (request, response, next) => {
    fetchCategories().then((returnedCategories) => {                
        response.status(200).send({categories: returnedCategories})
    })
    .catch((error)=> {
        next(error)
    })
}


exports.formatSingleReview = (request, response, next) => {
    const reviewID = request.params.review_id
    fetchReview(reviewID).then((returnedReview) => {     
        response.status(200).send({review: returnedReview})
    })
    .catch((error) => {
        next(error)
    })
}


exports.formatReviews = (request, response, next) => {
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

exports.insertComment = (request, response, next) => {
    const sentPostRequest = request.body
    const review_id = request.params
    postCommentsById(sentPostRequest, review_id)
    .then((insertedComment) => {
        response.status(201).send({newComment: insertedComment })
    })
    .catch((error) => {
        console.log(error)
        next(error)
    })
}
    