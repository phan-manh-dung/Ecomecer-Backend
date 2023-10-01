const express = require('express')
const router = express.Router()
const { authUserMiddleware,authMiddleware } = require('../middleware/authMiddleware')
const ProductController = require('../controller/ProductController')

router.post('/create',ProductController.createProduct) 
router.put('/update/:id',authMiddleware,ProductController.updateProduct) 
router.delete('/delete/:id',ProductController.deleteProduct) 
router.get('/get-details/:id',ProductController.getDetailsProduct) 
router.get('/getAll',ProductController.getAllProduct) 

module.exports = router