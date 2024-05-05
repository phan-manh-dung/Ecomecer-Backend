const express = require('express')
const router = express.Router()
const { authUserMiddleware ,authMiddlewareOne} = require('../middleware/authMiddleware')
const OrderController = require('../controller/OrderController')

router.post('/create/:id', authMiddlewareOne, OrderController.createOrder)
router.get('/get-details-order/:id', OrderController.getDetailsOrder)
router.get('/get-all-order/:id',authUserMiddleware, OrderController.getAllOrderDetails)
router.get('/get-all-order', OrderController.getAllOrder)
router.get('/get-all-cart', OrderController.getAllCart)
router.delete('/cancel-order/:id', OrderController.cancelOrderDetails)
router.delete('/delete-cart/:id', OrderController.deleteCart)
router.post('/delete-many-order',OrderController.deleteMany)
router.post('/create-cart', OrderController.createCart); 
module.exports = router