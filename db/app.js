const express = require('express');
const { formatCategories } = require('./controllers');
const app = express(); 

app.get('/api/categories', formatCategories)

module.exports = app; 