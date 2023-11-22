const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")

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



const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findOne({
                user: id
            })
            console.log('order',order);
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

module.exports = {
    createOrder,
    getOrderDetails
}