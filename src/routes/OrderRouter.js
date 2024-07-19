const express = require('express');
const router = express.Router();
const { authUserMiddleware, authMiddlewareOne } = require('../middleware/authMiddleware');
const OrderController = require('../controller/OrderController');

// order
router.post('/create/:id', authMiddlewareOne, OrderController.createOrder);
router.get('/get-details-order/:id', OrderController.getDetailsOrder);
router.get('/get-all-order/:id', authUserMiddleware, OrderController.getAllOrderDetails);
router.get('/get-all-order', OrderController.getAllOrder);
// xóa order ra khỏi database (thực sự xóa dữ liệu)
router.delete('/delete-order/:id', OrderController.deleteOrderDatabaseByAdmin);
// cái này chỉ chuyển order sang status khác và không thực sự xóa dữ liệu
router.delete('/cancel-order/:id', OrderController.deleteOrderToCancelled);

// cart
router.get('/get-all-cart', OrderController.getAllCart);
router.delete('/delete-cart/:id', OrderController.deleteCart);
router.post('/delete-many-order', OrderController.deleteManyOrder);
router.post('/create-cart', OrderController.createCart);
// tìm id cart của user để xóa
router.get('/find-cart/:id', OrderController.findCart);
router.get('/check-purchased/:id', OrderController.checkIfUserPurchasedProduct);

module.exports = router;
