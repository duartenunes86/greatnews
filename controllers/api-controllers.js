const {
    selectAPI,
    
  } = require('../models/api-models.js');
  
  exports.getAPI = (req, res, next) => {
    selectAPI().then((endpoints) => {
      
      res.status(200).send( {endpoints });
      
    }) .catch((err) => {
      next(err);
    });
    }