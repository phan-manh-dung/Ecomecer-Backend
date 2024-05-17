const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                name: { type: String, required: true },
                amount: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                discount: { type: Number },
                color: { type: String },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
            },
        ],
        fullName: { type: String, required: true },
        phone: { type: Number, required: true },
        moreAddress: { type: String, required: true },
        district: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        paymentMethod: { type: String },
        shippingPrice: { type: Number },
        totalPrice: { type: Number },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },

        // trường trạng thái của đơn hàng
        status: {
            type: String,
            enum: ['wait_pay', 'pending', 'deliver', 'completed', 'cancelled'],
            default: 'pending',
        },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
    },
    {
        timestamps: true,
    },
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
