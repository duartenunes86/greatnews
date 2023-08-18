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
  console.log(err);
  res.status(500).send({ msg: 'Internal Server Error' });
};

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);




  
  
    
  




module.exports = app;