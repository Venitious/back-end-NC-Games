const db = require("./connection");

exports.fetchCategories = () => {
    const sqlQuery = `SELECT * FROM categories;`
    return db
    .query(sqlQuery)
    .then((result) => {
        return result.rows;
    })
    .catch((err) => {
        console.log(err)
        return 'this did not work!'
    })
}