const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true, index: true },
        image: { type: String, required: true },
        additionalImages: [{ type: String }],
        type: { type: String, required: true, index: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true, min: 0, default: 0 },
        description: { type: String },
        color: { type: String, required: true },
        discount: { type: Number },
        sold: { type: Number },
        brand: { type: String },
        originOfCountry: { type: String }, // xuất xứ
        delivery: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Delivery' }],
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    },
    {
        timestamps: true,
    },
);

// Xóa tất cả các review liên quan khi sản phẩm bị xóa
productSchema.pre('remove', async function (next) {
    await mongoose.model('Review').deleteMany({ product: this._id });
    next();
});

productSchema.pre('remove', async function (next) {
    await mongoose.model('Delivery').deleteMany({ product: this._id });
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
