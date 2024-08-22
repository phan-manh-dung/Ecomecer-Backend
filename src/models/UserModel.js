const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        socialId: { type: String, index: true },
        name: { type: String, unique: true, required: true, index: true },
        email: { type: String, index: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true, index: true },
        phone: { type: Number, index: true, unique: true },
        // address
        moreAddress: { type: String },
        district: { type: String },
        city: { type: String },
        country: { type: String },
        // user
        avatar: { type: String },
        dateOfBirth: { type: Date },
        sex: { type: String },
        country: { type: String },
        nickname: { type: String },
        loginType: { type: String },
    },
    {
        timestamps: true,
        strict: true,
    },
);
// Chỉ mục phức hợp này có thể được sử dụng nếu bạn có các truy vấn mà lọc dựa trên cả name và email.
// userSchema.index({ name: 1, email: 1 });
const User = mongoose.model('User', userSchema);
module.exports = User;
