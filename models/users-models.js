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
exports.selectUsers = () => {
    
    return db.query(`SELECT users.username,
    users.name,
   users.avatar_url
     FROM users;`).then((result) => {
     
      
      if(result.rows.length===0){
        return Promise.reject({status:404, msg:"user doesn't exist"})
      } 
      else{
      return result.rows;
      }
    });
  };
  exports.selectUserByUsername = (username) => {
   
 
    return db.query(`SELECT * FROM users WHERE username=$1;`,[username]).then((result) => {
      if(result.rows.length===0){
        return Promise.reject({status:404, msg:"article doesn't exist"})
      } 
     else{
      return result.rows[0];
      }
    
    })
  
  };


