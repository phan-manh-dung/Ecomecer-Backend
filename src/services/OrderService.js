const Order = require("../models/OrderProduct") // model để get dữ liệu vào
const Cart = require("../models/CartModel")

const { generalAccessToken, refreshAccessToken } = require('./JwtServices')

const createOrder = (newOrder) => {
    return new Promise( async(resolve,reject) => {
        
        const {orderItems,fullName,address,phone,paymentMethod,itemsPrice,totalPrice,shippingPrice,user} = newOrder
        try{
            const createOrder = await Order.create({
                orderItems,
                shippingAddress:{
                    fullName,
                    address,
                    phone
                },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                user:user
            })
            if(createOrder){
                resolve({
                    status:'OK',
                    message:'Success Order',
                    data:createOrder
                })
            }
        }catch(e){
            reject(e)
        }
     })
}

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
            type
        };

        const newCart = await Cart.create({
            userId,
            orderItems: [newCartItem]
        });

        if (newCart) {
            return {
                status: 'OK',
                message: 'Success Cart',
                data: newCart
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
                _id: id
            })
            console.log('order',order);
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined 1'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}

const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            }).sort({createdAt: -1, updatedAt: -1})
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find().sort({createdAt: -1, updatedAt: -1})
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllCart = async (userId) => {
    try {
        const userCarts = await Cart.find({ userId }); // Lấy các carts của người dùng dựa trên userId
        console.log('cart',userCarts);
        return userCarts;
    } catch (error) {
        throw error; 
    }
};



const cancelOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findByIdAndDelete(id);
            if (!order) {
                return resolve({
                    status: 'ERR',
                    message: 'Order does not exit'
                });
            }

            return resolve({
                status: 'OK',
                message: 'Delete order success',
                data: order
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteCart = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findByIdAndDelete(id);
            if (!cart) {
                return resolve({
                    status: 'ERR',
                    message: 'Cart does not exit'
                });
            }

            return resolve({
                status: 'OK',
                message: 'Delete cart success',
                data: cart
            });
        } catch (e) {
            reject(e);
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
            await Order.deleteMany({ _id: { $in: ids } }) // Sử dụng $in operator để xóa các bản ghi có _id nằm trong mảng ids
            resolve({
                status: 'OK',
                message: 'Delete order success',
            })
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createOrder,
    getOrderDetails,
    getAllOrderDetails,
    getAllOrder,
    cancelOrderDetails,
    deleteManyOrder,
    createCart,
    getAllCart,
    deleteCart
}




