const { selectUsers, selectUserByUsername, insertUser } = require("../models/users-models");
exports.getUsers = (req, res, next) => {
        
    selectUsers().then((users) => {

      
      res.status(200).send( {users});
      
    }) 
    .catch((err) => {
      next(err);
    });
    }
    exports.getUserByUsername= (req, res, next) => {
    
        const {username} = req.params
        
        
        selectUserByUsername(username).then((user) => {
          
          
         
    
          res.status(200).send(  {user });
    
    
    
      }) 
        .catch((err) => {
          
          next(err)
      });
    } 
    exports.postUser = (req, res, next) => {
      // const username=req.params.username
      // const name=req.params.name
      // const avatar_url=req.params.avatar_url
      
      // if(typeof req.body.username==='undefined' || typeof req.body.body==='undefined'){
      //  return Promise.reject(({status:400, msg:"Invalid input"}))
    //    .catch((err) =>{
    // next(err)
    //    })
    //   }else{
      insertUser(req.body.username, req.body.name, req.body.avatar_url).then((user) => {
        console.log(user)
        res.status(201).send({ user});})
       .catch((err) => {
        next(err);
      });
    }
      // }