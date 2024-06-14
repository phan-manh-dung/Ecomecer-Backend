const express = require('express');
const router = express.Router();
const { authUserMiddleware, authMiddleware, authMiddlewareUpdate } = require('../middleware/authMiddleware');
const ProductController = require('../controller/ProductController');

router.post('/create', ProductController.createProduct);
router.put('/update/:id', authMiddlewareUpdate, ProductController.updateProduct);
router.delete('/delete/:id', authMiddleware, ProductController.deleteProduct);
router.get('/get-details/:id', ProductController.getDetailsProduct);
router.get('/get-all', ProductController.getAllProduct);
router.post('/delete-many', authMiddleware, ProductController.deleteMany);
router.get('/get-all-type', ProductController.getAllType);
router.get('/filter-price-low-to-height', ProductController.filterByPriceLowToHeight);
router.get('/filter-price-height-to-low', ProductController.filterByPriceHeightToLow);
router.get('/new-products', ProductController.getNewProducts);
router.get('/selling', ProductController.getSellingProduct);
module.exports = router;
