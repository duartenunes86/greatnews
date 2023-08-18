const db = require('../db/connection');
const format = require('pg-format');

const checkExists =  (table, column, value) => {
  
 const queryStr= format('SELECT * FROM %I WHERE %I = $1;', table, column)
  return db.query(queryStr, [value]).then((dbOutput)=>{
console.log(db.Output)
  if (dbOutput.rows.length === 0) {
   
    return Promise.reject({ status: 404, msg: 'item doesn\'t exist' });
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
        return checkExists('articles', 'article_id', id).then((article)=>{
        if(article){
          const date = new Date().toISOString()
      return db.query(`INSERT INTO comments(body,
      votes,
      author,
      article_id,
      created_at) VALUES($1,$2,$3,$4, $5) RETURNING *;`,[body, 0, username,id, date]).then((comment)=>{
        return comment.rows[0]
      })
    }})
      }

      