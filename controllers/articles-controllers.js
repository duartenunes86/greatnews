const {
    selectArticleById,
    selectArticles,
    selectCommentsByArticle,
    insertCommentToArticle
    
  } = require('../models/articles-models.js');
  
  exports.getArticleById = (req, res, next) => {
    
    const {article_id} = req.params
    
    
    selectArticleById(article_id).then((article) => {
      
      
     

      res.status(200).send(  {article });



  }) 
    .catch((err) => {
      
      next(err)
  });
} 
    
    exports.getArticles = (req, res, next) => {
        
        selectArticles().then((articles) => {

          
          res.status(200).send( {articles});
          
        }) 
        .catch((err) => {
          next(err);
        });
        }
        exports.getCommentsByArticle = (req, res, next) => {
        const id =req.params.article_id;
        
        
          selectCommentsByArticle(id).then((comments) => {
           
            
            res.status(200).send( {comments});
          
            
          }) .catch((err) => {
            
            next(err)
  })
}
exports.postCommentToArticle = (req, res, next) => {
  const article_id=req.params.article_id
  
  insertCommentToArticle(req.body.username, req.body.body, article_id).then((comment) => {
    res.status(201).send({ comment });
  }) .catch((err) => {
    next(err);
  });
  }