const express = require('express')
const router = express.Router()
const { authUserMiddleware,authMiddleware } = require('../middleware/authMiddleware')
const OrderController = require('../controller/OrderController')

router.post('/create/:id', authUserMiddleware, OrderController.createOrder)
router.get('/get-details-order/:id', OrderController.getDetailsOrder)
module.exports = router