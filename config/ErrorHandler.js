// to handle the error;


const errorHandler = (err, req, res, next) =>{
if(!err.message){
    err.message = "unexpected error occured"
}
console.log("error Handler", err)
res.send({
    message : err.message,
    error : err
})

}



module.exports = errorHandler;