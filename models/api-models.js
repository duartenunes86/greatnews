// const fs = require('fs');

// exports.selectAPI = () => {
//   console.log("haldhkajfhsjkhlkfjdhk")
//   return fs.readFile("./endpoints.json", "utf-8", (err, data) => {
//     if (err) {
//       console.log(err);
//       return err;
//     }
//     else{
//     console.log("hsg;ldgkfjhaduliihliausdfhi")
//     const endpoints1 = JSON.parse(data);
//     console.log(endpoints1)
//     return endpoints1
//     }
//   });
  
// }

const fs=require('fs/promises')
exports.selectAPI = () =>{
  return fs.readFile('./endpoints.json', "utf-8").then((endpoints)=>{
    return JSON.parse(endpoints, "Endpoints")
  })
}
