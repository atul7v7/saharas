const productCatalog = require('../model/productCatalog')

/**
 * 
 * @param {name,price} req 
 * @param {message,data:{_id, name, price}} res 
 */
exports.register = async(req, res, next) =>{
    // we consider only unique item is entered
    try {
        const {name, price} = req.body;
        const prod_inst = await new productCatalog({name,price});
        const prod = await prod_inst.save();
         return res.status(201).json({message: "create successfully", data: prod});
    } catch (error) {
        if(!error.message){
            error.message("unable to add product")
        }
        next(error)
    }
}

/**
 * 
 * @param {} req 
 * @param {message,data:{_id, name, price}} res 
 */
exports.read = async (req, res, next) =>{
    try {
        const data = await productCatalog.find();
        return res.status(200).json({"message": "successfully fetched the data", data})
    } catch (error) {
        if(!error.message){
            error.message("error occured in fetching")
        }
        next(error)
    }
}


/**
 * 
 * @param {_id,name,price} req 
* @param {message,data:{_id, name, price}} res 
 */
exports.update =async (req, res, next) =>{
    try {
        const {name, price, _id} = req.body;
        const modified = await productCatalog.updateOne({_id},{$set : {name,price} })
        if(modified.modifiedCount == 1){
           return res.status(200).json({"message": "updated succesfully", data: {...req.body}})        
        }throw new Error("unable to update data")
    } catch (error) {
        if(!error.message){
            error.message = "Error occured in updating docs";
            next(error);
        }
    }
}

/**
 * 
 * @param {_id} req 
 * @param {message,data:{}} res 
 */
exports.remove = async(req, res, next) =>{
    try {
        const {_id} = req.body;
        const {deletedCount} = await productCatalog.deleteOne({_id})
        console.log(deletedCount)
        if(deletedCount){
            return res.status(200).json({"message": "deleted successfully",data:{}})
        }throw new Error("Error occured in deleting product")
    } catch (error) {
        if(!error.message){
            error.message = "Error occured in deleting"
            next(error)
        }       
    }
}