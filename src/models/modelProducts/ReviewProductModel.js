const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: String, required: true }, // Tên người dùng đánh giá
    rating: { type: Number, required: true }, // Xếp hạng
    comment: { type: String, required: true }, // Bình luận
    createdAt: { type: Date, default: Date.now }, // Thời gian tạo đánh giá
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
