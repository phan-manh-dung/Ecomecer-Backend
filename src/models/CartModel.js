const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Tham chiếu đến ID của người dùng
    orderItems: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Tham chiếu đến ID của sản phẩm
            color: { type: String },
            discount: { type: Number },
            type: { type: String },
        }
    ],
    // Các trường thông tin khác của đơn hàng (nếu cần)
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
