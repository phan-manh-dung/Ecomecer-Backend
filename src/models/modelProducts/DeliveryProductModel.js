const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    deliveryTime: { type: String, required: true }, // Thời gian giao hàng
    deliveryMethod: { type: String, required: true }, // Hình thức giao hàng
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
