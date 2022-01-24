const User = require("../model/userModel")
const bcrypt = require("bcrypt")
const {generateToken} = require('../util/jwtToken');


/**
 * 
 * @param {username, password,name} req 
 * @param {message, data:{_id, name, username}} res 
 * @param {*} next 
 */
exports.register  = async (req, res, next) =>{
    try {
        let {username,password,name} = req.body;
        const isUserRegister = await User.findOne({username})
        if(isUserRegister){
            throw new Error("user already registerd")
        }
        const hash = await bcrypt.hash(password, 12);
        const user_inst = await new User({name,username,password:hash})
        const saved_user = await user_inst.save();
        if(saved_user){
            return res.status(201).json({"message":"user registerd successfully", data:saved_user})
        }throw new Error("Error in registering user")
    } catch (error) {
        if(!error.message){
            error.message = "Error in registering user"
        }
        next(error)
    }
}

/**
 * 
 * @param {username,password} req 
 * @param {*message, data:{}} res 
 * @param {*} next 
 */
exports.login  =async (req, res, next) =>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        if(!user){
            throw new Error("user not registered")
        }
        // compare the credential 
        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid){
            throw new Error("Invalid credentials")
        }
        const token = await generateToken(user)
        //adding token to headers;
        res.append('Authentication',`Bearer ${token}`)
        return res.status(200).json({message : "loged in !!", data:{_id:user._id,username,name:user.name}})
        
    } catch (error) {
        next(error)        
    }
}
