const express = require('express')
const router = express.Router()
const { authUserMiddleware,authMiddleware } = require('../middleware/authMiddleware')
const OrderController = require('../controller/OrderController')

router.post('/create/:id', authUserMiddleware, OrderController.createOrder)
router.get('/get-details-order/:id', OrderController.getDetailsOrder)
router.get('/get-all-order/:id',authUserMiddleware, OrderController.getAllOrderDetails)
router.get('/get-all-order', OrderController.getAllOrder)
router.delete('/cancel-order/:id', OrderController.cancelOrderDetails)
module.exports = router