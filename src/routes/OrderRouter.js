const express = require('express')
const router = express.Router()
const { authUserMiddleware,authMiddleware } = require('../middleware/authMiddleware')
const OrderController = require('../controller/OrderController')

router.post('/create/:id', authUserMiddleware, OrderController.createOrder)
module.exports = router