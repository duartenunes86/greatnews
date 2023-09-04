const {
    selectArticleById,
    selectArticles,
    selectCommentsByArticle,
    insertCommentToArticle,
    updateVotesByArticle,
    updateCommentVotes
    
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
  
  if(typeof req.body.username==='undefined' || typeof req.body.body==='undefined'){
   return Promise.reject(({status:400, msg:"Invalid input"}))
   .catch((err) =>{
next(err)
   })
  }else{
  insertCommentToArticle(req.body.username, req.body.body, article_id).then((comment) => {
    res.status(201).send({ comment });})
   .catch((err) => {
    next(err);
  });
}
  }

  exports.patchVotesByArticle = (req, res, next) =>{
    const id=req.params.article_id
    
    const newVote=req.body.inc_votes
    
    updateVotesByArticle(id, newVote).then((article) =>{
      res.status(200).send({article})
    }).catch((err)=>{
      next(err)
    })
  }
  exports.patchVotesByComment = (req, res, next) =>{
    const id=req.params.comment_id
    
    const newVote=req.body.inc_votes
    
    updateCommentVotes(id, newVote).then((comment) =>{
      res.status(200).send({comment})
    }).catch((err)=>{
      next(err)
    })
  }