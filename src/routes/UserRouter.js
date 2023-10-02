const express = require('express')
const userController = require('../controller/UserController')
const { authUserMiddleware,authMiddleware } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/sign-up',userController.createUser) 
router.post('/sign-in',userController.loginUser) 
router.post('/log-out',userController.logUotUser) 
router.put('/update-user/:id',userController.updateUser) 
router.delete('/delete-user/:id',authMiddleware,userController.deleteUser) 
router.get('/getAll',authMiddleware,userController.getAllUser) 
router.get('/get-details/:id',authUserMiddleware,userController.getDetailsUser) 
router.post('/refresh-token',userController.refreshToken) 

module.exports = router