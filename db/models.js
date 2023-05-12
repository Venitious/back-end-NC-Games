const db = require("./connection");
const format = require('pg-format');

exports.fetchCategories = () => {
    const sqlQuery = `SELECT * FROM categories;`
    return db
    .query(sqlQuery)
    .then((result) => {
        return result.rows;
    })
}

exports.fetchReviews = () => {   
    const sqlQuery = `SELECT reviews.review_id, reviews.title, reviews.category, reviews.designer, reviews.owner, reviews.review_img_url, reviews.created_at, reviews.votes, COUNT(comments.review_id) AS comment_count FROM reviews
    LEFT JOIN comments
    ON reviews.review_id = comments.review_id
    GROUP BY reviews.review_id
    ORDER BY reviews.created_at DESC;`
    return db
    .query(sqlQuery)
    .then((result) => {
        return result.rows; 
    })
}


exports.fetchReview = (reviewId) => {
    const sqlInsertion = [reviewId]
    const sqlQuery = `SELECT * FROM reviews
    WHERE review_id = $1`
    return db
    .query(sqlQuery, sqlInsertion)
    .then((result) => {
        const user = result.rows[0];
        if (!user) {
            return Promise.reject({
              status: 404,
              msg: `No user found for review_id: ${reviewId}`,
            });
          }
        return user
    })

}

exports.retrieveEndpoints = () => {
    
}

exports.postCommentsById = (postRequest, queryId) => {
    const username = postRequest.username;
    const body = postRequest.body;
    const reviewId = queryId.review_id;
    
    const sqlInputs = [username, body, reviewId]

    const sqlQuery =     
    `INSERT INTO comments
    (author, body, review_id)
    VALUES
    ($1 , $2 , $3)
    RETURNING *;`

    if (typeof body !== 'string' || body.length === 0 || typeof username !== 'string' || username.length === 0) {
        return Promise.reject({
            status: 400,
            msg: `Invalid input`,
          });
    }

    return db
    .query(sqlQuery, sqlInputs)
    .then ((result) => {
        const newComment = result.rows[0]
        return newComment;
    })

}
