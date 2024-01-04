const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name: { type: String ,unique: true ,required: true },
        email: { type: String },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: Number },
        // address
        moreAddress:{type:String},
        district: { type: String },
        city: {type: String},
        country:{type:String},
        // user
        avatar: { type: String },
        dateOfBirth: { type: Date },
        sex:{type: String},
        country:{type:String},
        nickname:{type:String}
     
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;

