const express = require('express');
const app = express();
const {
  getTopics
} = require('./controllers/topics-controllers.js');
const { getAPI } = require('./controllers/api-controllers.js')
const { getArticleById, getArticles, getCommentsByArticle, postCommentToArticle, patchVotesByArticle } = require('./controllers/articles-controllers.js')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/api/topics', getTopics);
app.get('/api', getAPI)
app.get('/api/articles/:article_id',getArticleById)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id/comments', getCommentsByArticle)
app.post('/api/articles/:article_id/comments', postCommentToArticle)
app.patch('/api/articles/:article_id', patchVotesByArticle)
handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

handlePsqlErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Invalid input' });
  } else next(err);
};

handleServerErrors = (err, req, res, next) => {
 
  res.status(500).send({ msg: 'Internal Server Error' });
};

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);




  
  
    
  




module.exports = app;