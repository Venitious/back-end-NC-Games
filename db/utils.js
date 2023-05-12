const db = require("./connection");

exports.doesCategoryExist = (value) => {

	const queryStr = ('SELECT * FROM reviews WHERE review_id = $1;');
	return db
		.query(queryStr, [value])
		.then((result) => {
			if (result.rows.length === 0) {
				return Promise.reject({ status: 404, msg: `The id number ${value}, is not currently in use` });
			}
		})
}