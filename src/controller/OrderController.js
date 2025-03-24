const OrderService = require('../services/OrderService');

const createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            fullName,
            phone,
            moreAddress,
            district,
            city,
            paymentMethod,
            shippingPrice,
            totalPrice,
            user,
            product,
        } = req.body;

        if (
            !fullName ||
            !phone ||
            !moreAddress ||
            !district ||
            !city ||
            !paymentMethod ||
            !shippingPrice ||
            !totalPrice
        ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required',
            });
        }

        const newOrder = {
            orderItems,
            fullName,
            phone,
            moreAddress,
            district,
            city,
            paymentMethod,
            shippingPrice,
            totalPrice,
            user,
            product,
        };

        const response = await OrderService.createOrder(newOrder);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'Internal server error',
        });
    }
};

const createCart = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'userId is a required field',
            });
        }

        const response = await OrderService.createCart(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'Internal server error',
        });
    }
};

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required',
            });
        }
        const response = await OrderService.getOrderDetails(orderId);
        return res.status(200).json(response);
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e,
        });
    }
};

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const status = req.headers.status;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required',
            });
        }
        const response = await OrderService.getAllOrderDetails(userId, status);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder();
        return res.status(200).json(data);
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e,
        });
    }
};

const getAllCart = async (req, res) => {
    try {
        const userId = req.query.userId; // Lấy userId từ query parameters
        const userCarts = await OrderService.getAllCart(userId);
        return res.status(200).json(userCarts);
    } catch (e) {
        return res.status(404).json({ message: e.message });
    }
};

const deleteOrderDatabaseByAdmin = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required',
            });
        }
        const response = await OrderService.deleteOrderDatabaseByAdmin(orderId);
        return res.status(200).json(response);
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e,
        });
    }
};

const deleteOrderToCancelled = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required',
            });
        }
        const response = await OrderService.deleteOrderToCancelled(orderId);
        return res.status(200).json(response);
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e,
        });
    }
};

const deleteCart = async (req, res) => {
    try {
        const cartId = req.params.id;
        if (!cartId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The CartID is required',
            });
        }
        const response = await OrderService.deleteCart(cartId);
        return res.status(200).json(response);
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e,
        });
    }
};

const deleteManyOrder = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids undefined',
            });
        }
        const response = await OrderService.deleteManyOrder(ids); // nếu k rơi vào trường hợp nào thì cho
        //userId qua thằng UserService
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const deleteManyCart = async (req, res) => {
    try {
        const cartIdObjects = req.body;
        const ids = cartIdObjects.map((item) => item.cartId);
        console.log('ids', ids);

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The ids are required and must be an array',
            });
        }

        const response = await OrderService.deleteManyCart(ids);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const findCart = async (req, res) => {
    try {
        const { id } = req.params; // Thay đổi ở đây, sử dụng id thay vì userId
        const { productId } = req.query; // Thay đổi ở đây, sử dụng req.query để truy cập vào productId
        if (!id || !productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId or productId is required',
            });
        }
        const response = await OrderService.findCart(id, productId); // Sửa lại đây để truyền id thay vì userId
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const findManyCart = async (req, res) => {
    try {
        const { id } = req.params; // Sử dụng id của user
        const { productIds } = req.body; // Nhận productIds từ body

        if (!id || !productIds) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId and productIds are required',
            });
        }

        // Nếu productIds không phải là mảng, chuyển nó thành mảng
        const productIdsArray = Array.isArray(productIds) ? productIds : [productIds];

        const response = await OrderService.findManyCart(id, productIdsArray); // Truyền mảng productIds
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message,
        });
    }
};

const checkIfUserPurchasedProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId } = req.query;
        if (!id || !productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId or productId is required controller',
            });
        }
        const response = await OrderService.checkIfUserPurchasedProduct(id, productId);
        return res.status(200).json({
            purchased: response, // true hoặc false
        });
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

module.exports = {
    createOrder,
    getDetailsOrder,
    getAllOrderDetails,
    getAllOrder,
    deleteOrderToCancelled,
    deleteManyOrder,
    createCart,
    getAllCart,
    deleteCart,
    deleteManyCart,
    findCart,
    findManyCart,
    deleteOrderDatabaseByAdmin,
    checkIfUserPurchasedProduct,
};
