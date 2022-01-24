const {Schema, model} = require('mongoose')


const schema = new Schema({
    author : {
        type:Object,
        require:true
    },
    type:{
        type:String,
        enum : ['public', 'private'],
        default:'public'
    },
    items :{
        type:Array
    },
    name:{
        type:String,
        require:true
    }
})

// check limit for array length greater than 50;
schema.pre('save', async function(next){
    if(this.items.length > 50)
        throw new Error("Length limit crossed")
    next()    
})


module.exports = model('whislist', schema);