const express = require('express');
const userController = require('../controller/UserController');
const { authUserMiddleware, authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.post('/log-out', userController.logUotUser);
router.put('/update-user/:id', authMiddleware, userController.updateUser);
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
router.get('/getAll', userController.getAllUser);
router.get('/get-details/:id', userController.getDetailsUser);
router.post('/refresh-token', userController.refreshToken);
router.post('/delete-many', authMiddleware, userController.deleteMany);
router.post('/reset-password', userController.resetPassword);
// api tìm tên người dùng
router.get('/find-name/:id', userController.findNameUser);
router.get('/find-phone', userController.findPhoneForUser);

module.exports = router;
