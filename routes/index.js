const router = require('express').Router()


const { append } = require('express/lib/response')
const productCatalog = require('../routes/productCatalog')
const userRoutes = require('./userRoutes')
const whislistRoute = require('./whislistRoute')

router.use('/product',productCatalog)
router.use('/user', userRoutes)
router.use('/whislist',whislistRoute)

module.exports = router