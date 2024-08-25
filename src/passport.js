var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
const passport = require('passport');
const User = require('./models/UserModel'); // Import model User từ file tương ứng của bạn

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
        },

        async function (accessToken, refreshToken, profile, cb) {
            try {
                if (profile?.id) {
                    const user = await User.findOneAndUpdate(
                        { socialId: profile.id }, // Điều kiện tìm kiếm
                        {
                            $setOnInsert: {
                                // Thông tin cần thêm nếu không tìm thấy
                                id: profile.id,
                                name: profile.displayName,
                                loginType: 'google',

                                // Thêm các trường thông tin khác từ profile nếu cần
                            },
                        },
                        { upsert: true, new: true }, // upsert: true để tạo mới nếu không tìm thấy
                    );
                    return cb(null, user);
                }
            } catch (error) {
                return cb(error, null);
            }
        },
    ),
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: '/api/auth/facebook/callback',
            profileFields: ['email', 'photos', 'id', 'displayName'],
        },

        async function (accessToken, refreshToken, profile, cb) {
            try {
                if (profile?.id) {
                    const user = await User.findOneAndUpdate(
                        { socialId: profile.id }, // Điều kiện tìm kiếm
                        {
                            $setOnInsert: {
                                // Thông tin cần thêm nếu không tìm thấy
                                id: profile.id,
                                name: profile.displayName,
                                loginType: 'facebook',
                            },
                        },
                        { upsert: true, new: true }, // upsert: true để tạo mới nếu không tìm thấy
                    );
                    return cb(null, user);
                }
            } catch (error) {
                return cb(error, null);
            }
        },
    ),
);
