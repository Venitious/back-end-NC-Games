const { fetchCategories } = require("./models")

exports.formatCategories = (request, response) => {
    fetchCategories().then((returnedCategories) => {
        response.status(200).send({categories: returnedCategories})
    })
}

