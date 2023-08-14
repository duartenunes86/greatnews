const express = require('express');
const app = express();
const {
  getTopics
} = require('./controllers/topics-controllers');



app.get('/api/topics', getTopics);

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
    response.status(404).send()
  }
})



module.exports = app;