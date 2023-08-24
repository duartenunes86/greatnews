const db = require('./db/connection');
const format = require('pg-format');



exports.checkExists =  (table, column, value) => {
  
    const queryStr= format('SELECT * FROM %I WHERE %I = $1;', table, column)
     return db.query(queryStr, [value]).then((dbOutput)=>{
  
     if (dbOutput.rows.length === 0) {
      
       return Promise.reject({ status: 404, msg: 'item doesn\'t exist' });
     }
     else return true
   })}