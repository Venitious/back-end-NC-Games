const { fetchCategories, fetchReviews, fetchReview, fetchCommentsById } = require("./models")
const fs = require('fs')
const endpoints = require('../endpoints.json')
const { doesCategoryExist } = require("./seeds/utils")




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

exports.formatCommentsById = (request, response, next) => {
    const queryId = request.params.review_id;
    fetchCommentsById(queryId).then((returnedComments) => {
        response.status(200).send({comments:returnedComments})
    })
    .catch((error) => {
        next(error)
    })
}

