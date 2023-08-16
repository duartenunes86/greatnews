const express = require('express');
const app = express();
const {
  getTopics
} = require('./controllers/topics-controllers.js');
const { getAPI } = require('./controllers/api-controllers.js')



app.get('/api/topics', getTopics);
app.get('/api', getAPI)




  
  
    
  




module.exports = app;