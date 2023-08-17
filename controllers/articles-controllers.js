const {
    selectArticleById,
    selectArticles,
    selectCommentsByArticle
    
  } = require('../models/articles-models.js');
  
  exports.getArticleById = (req, res, next) => {
    
    const {article_id} = req.params
    
    
    selectArticleById(article_id).then((article) => {
      
      
     

      res.status(200).send(  {article });



  }) 
    .catch((err) => {
      console.log(err)
      const{status, msg} = err

      res.status(status).send({msg})
  });
} 
    
    exports.getArticles = (req, res, next) => {
        
        selectArticles().then((results) => {

          
          res.status(200).send( {results });
          
        }) 
        // .catch((err) => {
        //   next(err);
        // });
        }
        exports.getCommentsByArticle = (req, res, next) => {
        const id =req.params.article_id;
        
        
          selectCommentsByArticle(id).then((results) => {
           
            
            res.status(200).send( {results });
          
            
          }) .catch((error) => {
            const{status, msg}=error
            res.status(status).send({msg});
  })
}
