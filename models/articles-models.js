const db = require('../db/connection');
const format = require('pg-format');

const checkExists =  (table, column, value) => {
  
 const queryStr= format('SELECT * FROM %I WHERE %I = $1;', table, column)
  return db.query(queryStr, [value]).then((dbOutput)=>{

  if (dbOutput.rows.length === 0) {
   
    return Promise.reject({ status: 404, msg: 'Invalid input' });
  }
  else return true
})}


exports.selectArticleById = (id) => {
   
 
  return db.query(`SELECT * FROM articles WHERE article_id=$1;`,[id]).then((result) => {
    if(result.rows.length===0){
      return Promise.reject({status:404, msg:"article doesn't exist"})
    } 
   else{
    return result.rows[0];
    }
  
  })

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
     
      
      if(result.rows.length===0){
        return Promise.reject({status:404, msg:"article doesn't exist"})
      } 
      else{
      return result.rows;
      }
    });
  };

  exports.selectCommentsByArticle = (id) =>{

    return checkExists('articles', 'article_id',id).then((exists) => {
  
    if(exists===true){
    return db.query(` SELECT comment_id,
    votes,
    created_at,
    author,
    body,
    article_id FROM comments WHERE article_id=$1;`, [id]).then((result)=>{
      
      return result.rows;
      })}})}


      exports.insertCommentToArticle = (username, body, id) => {
        return checkExists('users', 'username', username).then(userExists=>{
          if(userExists){
        return checkExists('articles', 'article_id', id).then((article)=>{
          
        if(article){
         
      return db.query(`INSERT INTO comments(body,
     
      author,
      article_id) VALUES($1,$2,$3) RETURNING *;`,[body, username,id]).then((comment)=>{
        return comment.rows[0]
      })
    }
 
  
  
  })
      }

    })} 
    exports.updateCommentVotes= (comment_id, newVote) =>{
      return checkExists('comments', 'comment_id', comment_id).then((exists)=>{
          if(exists){
          return db.query('SELECT votes FROM comments WHERE comment_id=$1;', [comment_id]).then((votes)=>{
            return db.query('UPDATE comments SET votes = $1 WHERE comment_id=$2 RETURNING *;',[votes.rows[0].votes+newVote,comment_id]).then((comment)=>{
              
              return comment.rows[0]
            })
          })
        }
      })
    }
    exports.updateVotesByArticle= (id, newVote) =>{
      return checkExists('articles', 'article_id', id).then((exists)=>{
          if(exists){
          return db.query('SELECT votes FROM articles WHERE article_id=$1;', [id]).then((votes)=>{
            return db.query('UPDATE articles SET votes = $1 WHERE article_id=$2 RETURNING *;',[votes.rows[0].votes+newVote,id]).then((article)=>{
              
              return article.rows[0]
            })
          })
        }
      })
    }