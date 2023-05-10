const { fetchCategories, fetchReviews, fetchReview } = require("./models")

exports.formatCategories = (request, response, next) => {
    fetchCategories().then((returnedCategories) => {                
        response.status(200).send({categories: returnedCategories})
    })
    .catch((error)=> {
        next(error)
    })
}

exports.formatReviews = (request, response) => {
    fetchReviews().then((returnedReviews) => {
        response.status(200).send({reviews:returnedReviews})
    })
}

exports.formatSingleReview = (request, response, next) => {
    const reviewID = request.params.review_id
    fetchReview(reviewID).then((returnedReview) => {     
        response.status(200).send({review: returnedReview})
    })
    .catch((error) => {
        console.log(error)
        next(error)
    })
}

