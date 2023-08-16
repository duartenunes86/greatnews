const express = require('express');
const app = express();
const {
  getTopics
} = require('./controllers/topics-controllers.js');
const { getAPI } = require('./controllers/api-controllers.js')
const { getArticleById, getArticles, getCommentsByArticle } = require('./controllers/articles-controllers.js')




app.get('/api/topics', getTopics);
app.get('/api', getAPI)
app.get('/api/articles/:article_id',getArticleById)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id/comments', getCommentsByArticle)
app.use((err, request, response, next) =>{
  if(err.code === '23502'){
    response.status(400).send({msg: 'Bad request'})
  }
  else{
    next(err)
  }
})

app.use((err, request, response, next) =>{
  if(err.status===404){
    response.status(404).send(err.msg)
  }
})


  
  
    
  




module.exports = app;