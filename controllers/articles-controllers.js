const {
    selectArticleById,
    
  } = require('../models/articles-models.js');
  
  exports.getArticleById = (req, res, next) => {
    console.log("fjdijsoijdifjdoijdi")
    const id = req.params.article_id
    console.log(id)
    selectArticleById(id).then((article) => {
      
      res.status(200).send( {article });
      
    }) .catch((err) => {
      next(err);
    });
    }