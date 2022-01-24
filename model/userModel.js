const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:{
        type: String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String
    }
})


module.exports = mongoose.model('UserCollection', schema)