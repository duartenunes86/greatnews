const express = require('express');
const app = express();
const {
  getTopics
} = require('./controllers/topics-controllers.js');
const { getAPI } = require('./controllers/api-controllers.js')
const { getArticleById } = require('./controllers/articles-controllers.js')



app.get('/api/topics', getTopics);
app.get('/api', getAPI)
app.get('/api/articles/:article_id',getArticleById)



  
  
    
  




module.exports = app;