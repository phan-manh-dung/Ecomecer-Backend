const Order = require("../models/OrderProduct")

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

module.exports = {
    createOrder
}