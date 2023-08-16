const {
    selectArticleById,
    selectArticles,
    selectCommentsByArticle
    
  } = require('../models/articles-models.js');
  
  exports.getArticleById = (req, res, next) => {
    
    const {article_id} = req.params
    
    
    selectArticleById(article_id).then((article) => {
      
      
      if (article.length===0) {res.status(404).send({ msg:'article doesn\'t exist' });
}

      res.status(200).send( {article });

   } ) .catch((err) => {
      next(err);
    });}
    
    exports.getArticles = (req, res, next) => {
        
        selectArticles().then((results) => {

          
          res.status(200).send( {results });
          
        }) .catch((err) => {
          next(err);
        });
        }
        exports.getCommentsByArticle = (req, res, next) => {
        const id =req.params.article_id;
        
        
          selectCommentsByArticle(id).then((results) => {
           
            if (results.length===0) {res.status(404).send({ msg:'article doesn\'t exist' });
          }else{
            res.status(200).send( {results });
          }
            
          }) .catch((error) => {
            res.status(500).send({ msg: 'An error occurred' });
  });
          };
          