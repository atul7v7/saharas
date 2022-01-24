const router = require('express').Router()

const {createWhislist,
deleteWhislist,
updateWhislist,
readPublicWhislist,
addItem,
getWishlistDetail,
updateItem,
emptyItem
,deleteItem
} 
= require("../controller/whislistController")


router.post('/create', createWhislist);
router.delete('/delete',deleteWhislist);
router.put('/update', updateWhislist)
router.get('/read', readPublicWhislist)

router.get('/getWishlist',getWishlistDetail)
router.post('/addItem',addItem)
router.put('/updateItem', updateItem)

// empty the whislist
router.delete('/emptyItem', emptyItem);
router.delete('/deleteItem',deleteItem)


module.exports = router;