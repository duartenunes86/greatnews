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


app.use((err, req, res, next) => {
  
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  
  else if (err.code === '22P02') {
    res.status(400).send({ msg: err.message || 'Bad Request' });
  } else {
    
    console.log(err);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
})


  
  
    
  




module.exports = app;