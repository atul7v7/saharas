const {MONGODB_URI} = require('./env')
const {promisify} = require('util')
const connect = promisify(require('mongoose').connect)

const connectToSaras = async () =>{
    try {
        const db = await connect(MONGODB_URI);
        console.log("connectd to db")
        return db;
        
    } catch (error) {
        next(error)
    }
}

module.exports = connectToSaras