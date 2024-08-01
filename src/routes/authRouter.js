const router = require('express').Router();
const passport = require('passport');
require('dotenv').config();
const authController = require('../controller/authController');

// localhost://4000/api/auth/google

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false })); // không dùng cookie session nên
// phải để session:false để không bị báo lỗi

router.get(
    '/google/callback',
    (req, res, next) => {
        passport.authenticate('google', (err, profile) => {
            if (err) {
                console.error(err);
            }
            req.user = profile;
            next();
        })(req, res, next);
    },
    (req, res) => {
        res.redirect(`${process.env.URL_CLIENT}/login-success/${req.user?.id}`);
    },
);

// fb

router.get('/facebook', passport.authenticate('facebook', { session: false, scope: ['email'] }));

router.get(
    '/facebook/callback',
    (req, res, next) => {
        passport.authenticate('facebook', (err, profile) => {
            req.user = profile;
            next();
        })(req, res, next);
    },
    (req, res) => {
        res.redirect(`${process.env.URL_CLIENT}/login-success/${req.user?.id}`);
    },
);

router.post('/login-success', authController.loginSuccess);

module.exports = router;
