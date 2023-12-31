const OrderService = require('../services/OrderService')

const createOrder = async (req, res) => {
    try { 
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone } = req.body
        if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await OrderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const createCart = async (req, res) => {
    try { 
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'userId is a required field'
            });
        }

        const response = await OrderService.createCart(req.body);
        console.log('data', response);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'Internal server error'
        });
    }
};

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        console.log();
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getOrderDetails(orderId)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getAllOrderDetails(userId)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder()
        return res.status(200).json(data)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getAllCart = async (req, res) => {
    try {
        const userId = req.query.userId; // Lấy userId từ query parameters
        const userCarts = await OrderService.getAllCart(userId);
        return res.status(200).json(userCarts);
    } catch (e) {
        return res.status(404).json({ message: e.message });
    }
};

const cancelOrderDetails = async (req, res) => {
    try {
         const orderId = req.params.id;
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.cancelOrderDetails(orderId)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const deleteCart = async (req, res) => {
    try {
         const cartId = req.params.id;
        if (!cartId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The CartID is required'
            })
        }
        const response = await OrderService.deleteCart(cartId)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMany= async (req,res) => {
    try{
        const ids = req.body.ids
        if(!ids){
              return res.status(200).json({
                status:'ERR',
                message:'The ids undefined'
            })
        }
         const response = await OrderService.deleteManyOrder(ids) // nếu k rơi vào trường hợp nào thì cho 
         //userId qua thằng UserService
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message:e
        })
    }
}


module.exports = {
    createOrder,
    getDetailsOrder,
    getAllOrderDetails,
    getAllOrder,
    cancelOrderDetails,
    deleteMany,
    createCart,
    getAllCart,
    deleteCart
}