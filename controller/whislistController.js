
const Wishlist = require("../model/whislistModel")

/**
 * 
 * @param {author,type,name} req.body 
 * @param {*} res 
 * @param {*} next 
 */
exports.createWhislist = async(req, res, next) =>{
    try {
        const {name, type, author, items} = req.body;
        // checking for pre-existing
        const whislist = await Wishlist.findOne({name});
        if(whislist)
            throw new Error("Whislist already created")
        
        // create whislist 
        const whislist_inst = await new Wishlist({name, type, author,items});
        console.log("whislist controller pre")
        const saved_whislist = await whislist_inst.save();
        console.log("whislist controller post")
        return res.status(201).json({"message": "whislist created", data: saved_whislist})
    } catch (error) {
        if(!error.message)
            error.message = "error in creating whislist";
        next(error)
    }
}

/**
 * 
 * @param {_id} req.body 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteWhislist = async(req, res, next) =>{
    try {        
           const {_id} = req.body;
           const {deletedCount} =  await Wishlist.deleteOne({_id})
           if(deletedCount)
            return res.status(200).json({message:"successfully deleted", data: {}})
           throw new Error("unable to delete")
    }catch (error) {
        if(!error.message)
            error.message = "unable to delete"
        next(error)
    }
}

// routes for updating the meta value only
// can change only name and type
exports.updateWhislist = async(req, res, next) =>{
    try{
    const {name, type,_id} = req.body;

    const {modifiedCount} = await Wishlist.updateOne({_id}, {$set: {name, type}})
      
    if(modifiedCount)
        return res.status(200).json({"message":"updated successfully", data:{}})
    throw new Error("something went wrong in updating")
    }catch(error){
        if(!error.message)
            error.message = "Error in updating"
        next(error)
    }
}


exports.readPublicWhislist =async (req, res, next) =>{
try {
    const whislist_list = await Wishlist.find({type:'public'})
    if(whislist_list.length == 0)
        throw new Error("No public whislist available")
    res.status(200).json({"message": "Successfully fetched", data: whislist_list})
} catch (error) {
    next(error)
}
}

/**
 * 
 * @param {name,items} req 
 * @param {Array of newly added item} res 
 * 
 */
exports.addItem = async (req, res, next) => {
try {    
    const {name, items} = req.body;
    const whislistName =await Wishlist.findOne({name})
    if(!whislistName){
        throw new ("No wish list exists")
    }
    const {modifiedCount} = await Wishlist.updateOne({name}, {$push:{items:{$each : items}}})
    if(modifiedCount)
        return res.status(200).json({message : "Item added successfully", data: items});
    throw new Error("something went wrong while adding to list");
} catch (error) {
    if(!error.message)
        error.message = "Error in adding item to whislist"
    next(error)
}

}

// no logic to update item
// as item is defined by seller end
exports.updateItem = (req, res, next) =>{

}

// empty all whislist item
exports.emptyItem = async   (req, res, next) =>{
    try {
        const {name} = req.body
       const {modifiedCount} = await Wishlist.updateOne({name},{$set:{items:""}})
       if(modifiedCount)
            return res.status(200).json({message:"wishlist emptied", data : {}})
        throw new Error("something went wrong while emptying")
    } catch (error) {
        if(error.message)
            error.message = "Error in deleting all item"
        next(error)
    }
}

exports.deleteItem = async(req, res, next) =>{
    try {
        const {name, item} = req.body;
        const {modifiedCount} = await Wishlist.updateOne({name}, {$pull : {items : {name:item.name, price : item.price} }})
        if(modifiedCount)
            return res.status(200).json({message:"item deleted successfully", data:{}})
        throw new Error("item deleted successfully")
    } catch (error) {
        if(!error.message)
            error.message = "Error occured in deleting item"
        next(error)
    }

}
// get wishlist detail
// recieve the author details
exports.getWishlistDetail = async (req, res, next) =>{
    const {author} = req.body;
    const wishlist = await Wishlist.find({author})
    if(wishlist.length == 0)
        throw new Error("No wishlist created")
    return res.status(200).json({message:"whishlist found successfully",data:wishlist });
}