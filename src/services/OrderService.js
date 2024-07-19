const Order = require('../models/OrderModel'); // model để get dữ liệu vào
const Cart = require('../models/CartModel');

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const {
            orderItems,
            fullName,
            phone,
            moreAddress,
            district,
            city,
            country,
            paymentMethod,
            shippingPrice,
            totalPrice,
            user,
            product,
        } = newOrder;

        try {
            const createOrder = await Order.create({
                orderItems,
                fullName,
                phone,
                moreAddress,
                district,
                city,
                country,
                paymentMethod,
                shippingPrice,
                totalPrice,
                user: user,
                product: product,
            });
            if (createOrder) {
                resolve({
                    status: 'OK',
                    message: 'Success Order',
                    data: createOrder,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const createCart = async ({ userId, name, amount, image, price, product, color, discount, type }) => {
    try {
        const newCartItem = {
            name,
            amount,
            image,
            price,
            product,
            color,
            discount,
            type,
        };

        const newCart = await Cart.create({
            userId,
            cartItems: [newCartItem],
        });

        if (newCart) {
            return {
                status: 'OK',
                message: 'Success Cart',
                data: newCart,
            };
        }
    } catch (error) {
        throw error;
    }
};

const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findOne({
                _id: id,
            });
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined 1',
                });
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order,
            });
        } catch (e) {
            console.log('error', e);
            reject(e);
        }
    });
};

const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id,
            }).sort({ createdAt: -1, updatedAt: -1 });
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined',
                });
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order,
            });
        } catch (e) {
            console.log('error', e);
            reject(e);
        }
    });
};

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find().sort({ createdAt: -1, updatedAt: -1 });
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllCart = async (userId) => {
    try {
        const userCarts = await Cart.find({ userId }); // Lấy các carts của người dùng dựa trên userId
        return userCarts;
    } catch (error) {
        throw error;
    }
};

const deleteOrderDatabaseByAdmin = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findByIdAndDelete(id);
            if (!order) {
                return resolve({
                    status: 'ERR',
                    message: 'Order does not exit',
                });
            }

            return resolve({
                status: 'OK',
                message: 'Delete order success',
                data: order,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteOrderToCancelled = async (id) => {
    try {
        const order = await Order.findById(id);
        if (!order) {
            return {
                status: 'ERR',
                message: 'Order does not exist',
            };
        }

        // Cập nhật trạng thái của đơn hàng thành "đã hủy"
        order.status = 'cancelled';
        await order.save();

        return {
            status: 'OK',
            message: 'Order cancelled successfully',
            data: order,
        };
    } catch (e) {
        throw e;
    }
};

const deleteCart = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findByIdAndDelete(id);
            if (!cart) {
                return resolve({
                    status: 'ERR',
                    message: 'Cart does not exit',
                });
            }

            return resolve({
                status: 'OK',
                message: 'Delete cart success',
                data: cart,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const findCart = (userId, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({ userId, 'cartItems.product': productId });
            if (!cart) {
                reject({ message: 'Cart not found service' });
            }
            resolve({ cartId: cart._id });
        } catch (error) {
            console.error('Error finding cart:', error);
            reject({ message: 'Internal server error' });
        }
    });
};

const findManyCart = (userId, productIds) => {
    return new Promise(async (resolve, reject) => {
        try {
            const carts = await Cart.find({ userId, 'cartItems.product': { $in: productIds } });
            if (!carts || carts.length === 0) {
                resolve({ message: 'No carts found for the given productIds' });
            } else {
                resolve({ carts: carts.map((cart) => ({ cartId: cart._id, productId: cart.cartItems.product })) });
            }
        } catch (error) {
            console.error('Error finding carts:', error);
            reject({ message: 'Internal server error' });
        }
    });
};

// const deleteManyProduct = (ids) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await Product.deleteMany({ _id: ids })
//             resolve({
//                 status: 'OK',
//                 message: 'Delete order success',
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

const deleteManyOrder = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Order.deleteMany({ _id: { $in: ids } });
            if (result.deletedCount === 0) {
                resolve({
                    status: 'OK',
                    message: 'No orders found to delete',
                });
            } else {
                resolve({
                    status: 'OK',
                    message: 'Delete order success',
                });
            }
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};

const deleteManyCart = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Cart.deleteMany({ _id: { $in: ids } });
            if (result.deletedCount === 0) {
                resolve({
                    status: 'OK',
                    message: 'No carts found to delete',
                });
            } else {
                resolve({
                    status: 'OK',
                    message: 'Delete carts success',
                });
            }
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};

const checkIfUserPurchasedProduct = async (id, productId) => {
    try {
        const order = await Order.findOne({
            user: id,
            'orderItems.product': productId,
        });

        return !!order; // Trả về true nếu đã mua, ngược lại false
    } catch (error) {
        throw new Error('Error checking purchase status');
    }
};

module.exports = {
    createOrder,
    getOrderDetails,
    getAllOrderDetails,
    getAllOrder,
    deleteManyOrder,
    createCart,
    getAllCart,
    deleteCart,
    deleteManyCart,
    findCart,
    findManyCart,
    deleteOrderDatabaseByAdmin,
    deleteOrderToCancelled,
    checkIfUserPurchasedProduct,
};
