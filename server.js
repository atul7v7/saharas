const express = require('express')


const PORT = require('./config/env').PORT || 7000

const connectToSaras = require('./config/connectToSarasDB')
const errorHandler = require('./config/ErrorHandler')
const routes = require('./routes/index')

const app = express();

app.use(express.json())
app.use(routes);

app.use(errorHandler)
// Adding error Handler


const startServer = async() =>{
    try {
        const db = await connectToSaras();
        app.listen(PORT, () => console.log(`server running at port ${PORT}`))
    } catch (error) {
        console.log("error in starting server")
    }
}


startServer();