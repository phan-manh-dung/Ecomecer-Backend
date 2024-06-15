const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const OrderRouter = require('./OrderRouter');
// oauth
const authRouter = require('./authRouter');
const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/product', ProductRouter);
    app.use('/api/order', OrderRouter);
    app.use('/api/auth', authRouter);
};

module.exports = routes;
