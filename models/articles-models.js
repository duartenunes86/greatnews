const db = require('../db/connection');

exports.selectArticleById = (id) => {
  return db.query(`SELECT * FROM articles WHERE article_id=${id};`).then((result) => {
    if(!result.rows){
      return Promise.reject({status:404, msg:`article doesn't exist`})
    } 
    return result.rows;
  });
};
exports.selectArticles = () => {
    
    return db.query(`SELECT articles.author,
    articles.title,
    articles.article_id,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.article_img_url,
    COUNT(comments.article_id) AS comment_count
     FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC;`).then((result) => {
     
      
      return result.rows;
    });
  };

  exports.selectCommentsByArticle = (id) =>{
    return db.query(` SELECT   comment_id,
    votes,
    created_at,
    author,
    body,
    article_id FROM comments WHERE article_id=${id};`).then((result)=>{
      if(!result.rows){
        return Promise.reject({status:404, msg:`article doesn't exist`})
      }
      return result.rows;
    })

  }