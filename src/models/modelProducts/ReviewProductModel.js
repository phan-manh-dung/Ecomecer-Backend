const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        nameUser: { type: String },
        avatarUser: { type: String },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        images: [{ type: String }],
    },
    {
        timestamps: true,
    },
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
