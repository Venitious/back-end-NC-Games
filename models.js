const db = require("./db/connection");

const { doesCategoryExist } = require("./utils");


exports.fetchCategories = () => {
    const sqlQuery = `SELECT * FROM categories;`
    return db
    .query(sqlQuery)
    .then((result) => {
        return result.rows;
    })
}

exports.fetchUsers = () => {
    const sqlQuery = `SELECT * FROM users;`
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


exports.fetchCommentsById = (queryId) => {
    const sqlInsertion = [queryId]
    const sqlQuery = `SELECT * FROM comments
    WHERE review_id = $1
    ORDER BY created_at DESC;`
    return doesCategoryExist(queryId)
    .then (() => {
        return db
        .query(sqlQuery, sqlInsertion)
        .then((result) => {
            return result.rows
        })
    })
}

exports.patchVotes = (votes, queryId) => {
    const sqlInputs = [votes, queryId]
    const sqlQuery = 
        `UPDATE reviews
        SET 
        votes = votes + $1
        WHERE review_id = $2
        RETURNING *;`
    
    return db
    .query(sqlQuery, sqlInputs)
    .then((result) => {
        const updatedReview = result.rows[0]
        if (!updatedReview){
            return Promise.reject({
                status: 404,
                msg: `Input not in use`
            })
        }         

        return updatedReview
    })
}

exports.deleteComment = (comment_id) => {
    const sqlQuery = `DELETE FROM comments WHERE comment_id = $1;`
    return db
    .query(sqlQuery, [comment_id])
    .then ((result) => {
        console.log(Object.keys(result.rows))
        .query('SELECT * FROM comments;')
        .then ((result) => {
            console.log(result.rows)
        })
        return result.rows
    })
}