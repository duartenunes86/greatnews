
  const fs=require('fs/promises')
  exports.getAPI = (req, res, next) => {
    return fs.readFile('./endpoints.json', "utf-8").then((endpoints)=>{
      return JSON.parse(endpoints, "Endpoints")
    }).then((endpoints) => {
      
      res.status(200).send( {endpoints });
      
    }) .catch((err) => {
      next(err);
    });
    }