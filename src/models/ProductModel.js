const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        description: { type: String },
        color: { type: String },
        discount: { type: Number },
        sold: { type: Number },
        brand: { type: String },
        amount: { type: Number },
        nameShop: { type: String },
        delivery: { type: mongoose.Schema.Types.ObjectId, ref: 'Delivery' },
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    },
    {
        timestamps: true, // tự động tạo 2 field là createdAt và updatedAt
    },
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
