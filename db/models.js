const db = require("./connection");

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

// let defaultSqlQuery = `SELECT treasures.*, shop_name FROM treasures
// LEFT JOIN shops 
// ON treasures.shop_id = shops.shop_id`

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