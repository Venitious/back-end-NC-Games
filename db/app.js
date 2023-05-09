const express = require('express');
const { formatCategories } = require('./controllers');
const { handleServerErrors } = require('./errorFunc');
const app = express(); 

app.get('/api/categories', formatCategories)

app.use(handleServerErrors)

module.exports = app; 