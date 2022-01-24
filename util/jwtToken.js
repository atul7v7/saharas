const jwt = require("jsonwebtoken")
const {SECRET} = require("../config/env")
exports.generateToken =async (payload) => {
   const load = {
       _id:payload.id,
       username:payload.username,
       name:payload.name
   }
   return await jwt.sign(load, SECRET);
}

// extract data and attaching to req.user
exports.verifyToken  =async(token) =>{

}