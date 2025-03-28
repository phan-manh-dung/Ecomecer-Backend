const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        cartItems: [
            {
                name: { type: String, required: true },
                amount: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                color: { type: String },
                discount: { type: Number },
                type: { type: String },
            },
        ],
    },
    { timestamps: true },
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
