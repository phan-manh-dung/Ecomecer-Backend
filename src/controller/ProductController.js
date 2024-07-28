const ProductService = require('../services/ProductService');
const { io } = require('../../index');

const createProduct = async (req, res) => {
    try {
        const {
            name,
            image,
            type,
            price,
            countInStock,
            description,
            color,
            discount,
            brand,
            originOfCountry,
            additionalImages = [],
        } = req.body;
        if (!name || !image || !type || !price || !countInStock || !color || !originOfCountry) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Input product error controller',
            });
        }
        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productID do not exist',
            });
        }
        const response = await ProductService.updateProduct(productId, data); // nếu k rơi vào trường hợp nào thì cho
        //userId qua thằng UserService
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId do not exist delete',
            });
        }
        const response = await ProductService.deleteProduct(productId); // nếu k rơi vào trường hợp nào thì cho
        //userId qua thằng UserService
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids undefined',
            });
        }
        const response = await ProductService.deleteManyProduct(ids); // nếu k rơi vào trường hợp nào thì cho
        //userId qua thằng UserService
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId do not exist getDetail',
            });
        }
        const response = await ProductService.getDetailsProduct(productId); // nếu k rơi vào trường hợp nào thì cho
        //userId qua thằng UserService
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query;
        const response = await ProductService.getAllProduct(Number(limit), Number(page) || 0, sort, filter);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getAllType = async (req, res) => {
    try {
        const response = await ProductService.getAllType();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getAllColor = async (req, res) => {
    try {
        const response = await ProductService.getAllColor();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const filterByPriceLowToHeight = async (req, res) => {
    try {
        const { type } = req.query; // lấy type từ query parameter
        const response = await ProductService.filterByPriceLowToHeight(type);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const filterByPriceHeightToLow = async (req, res) => {
    try {
        const { type } = req.query;
        const response = await ProductService.filterByPriceHeightToLow(type);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getNewProducts = async (req, res) => {
    try {
        const { type } = req.query;
        const response = await ProductService.getNewProducts(type);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getSellingProduct = async (req, res) => {
    try {
        const { type } = req.query;
        const response = await ProductService.getSellingProduct(type);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

// phần đánh giá cho sản phẩm

const createVote = async (req, res) => {
    try {
        const { productId, userId, nameUser, avatarUser, rating, comment, images = [] } = req.body;
        if (!productId || !userId || !nameUser || !rating || !comment) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Input vote error controller',
            });
        }
        const response = await ProductService.createVote(req.body);
        if (req.io) {
            req.io.emit('newComment', response);
        } else {
            console.error('io is undefined');
        }
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: 'An error occurred while creating the vote',
            error: e.message,
        });
    }
};

const getAllVotes = async (req, res) => {
    try {
        const response = await ProductService.getAllVotes();
        return res.status(200).json({
            status: 'OK',
            data: response,
        });
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: 'An error occurred while fetching votes',
            error: e.message,
        });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getDetailsProduct,
    getAllProduct,
    deleteMany,
    getAllType,
    filterByPriceLowToHeight,
    filterByPriceHeightToLow,
    getNewProducts,
    getSellingProduct,
    getAllColor,
    createVote,
    getAllVotes,
};
