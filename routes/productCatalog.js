const router = require('express').Router()
const {register,remove, update, read} = require('../controller/productCatalog')

router.get('/read', read)
router.post('/register',register)
router.put('/update', update)
router.delete('/remove',remove)

module.exports = router;