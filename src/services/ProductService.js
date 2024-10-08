const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const Review = require('../models/modelProducts/ReviewProductModel');

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
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
            additionalImages,
        } = newProduct;
        try {
            const checkProduct = await Product.findOne({
                name: name,
            });
            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name of product is already',
                });
            }
            const newProduct = await Product.create({
                name,
                image,
                type,
                price: Number(price),
                countInStock: Number(countInStock),
                description,
                color,
                discount: Number(discount),
                brand,
                originOfCountry,
                additionalImages: additionalImages || [],
            });
            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: newProduct,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not exists',
                });
            }

            const updatedProductNew = await Product.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProductNew,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not exists',
                });
            }
            await Product.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'Delete product Success',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids });
            resolve({
                status: 'OK',
                message: 'Delete product success',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id,
            });
            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not exists getDetail',
                });
            }
            resolve({
                status: 'OK',
                message: 'Success getDetail',
                data: product,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllProduct = (limit = 8, page = 0, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count();
            if (filter) {
                const label = filter[0];
                const regex = new RegExp(filter[1], 'i');
                const allObjectFilter = await Product.find({ [label]: { $regex: regex } })
                    .limit(limit)
                    .skip(page * limit);
                resolve({
                    status: 'OK',
                    message: 'Get all product Success ',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit),
                });
            }
            if (sort) {
                const objectSort = {};
                objectSort[(sort[1] = sort[0])];
                const allProductSort = await Product.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                resolve({
                    status: 'OK',
                    message: 'Get all product Success',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit),
                });
            }
            const allProduct = await Product.find()
                .limit(limit)
                .skip(page * limit);
            resolve({
                status: 'OK',
                message: 'Get all product Success',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit),
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type');

            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const searchProductsByTypeAndName = (type, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tạo query với điều kiện lọc theo type và tên sản phẩm
            const regex = new RegExp(name, 'i'); // Không phân biệt chữ hoa chữ thường
            const query = {
                type: type,
                name: { $regex: regex },
            };

            // Tìm sản phẩm theo điều kiện lọc
            const products = await Product.find(query);

            resolve({
                status: 'OK',
                message: 'Success',
                data: products,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllColor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allColor = await Product.distinct('color');

            resolve({
                status: 'OK',
                message: 'Success',
                data: allColor,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const filterByPriceLowToHeight = async (type) => {
    try {
        const products = await Product.find({ type }).sort({ price: 1 }); // sort theo giá tăng dần
        return {
            status: 'OK',
            message: 'Success filter low to height',
            data: products,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const filterByPriceHeightToLow = async (type) => {
    try {
        const products = await Product.find({ type }).sort({ price: -1 });
        return {
            status: 'OK',
            message: 'Success filter height to low',
            data: products,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const getNewProducts = async (type) => {
    try {
        const tenDaysAgo = new Date(); // lấy time persent
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10); // trừ 10 ngày từ time persent
        const products = await Product.find({ type, createdAt: { $gte: tenDaysAgo } });
        return {
            status: 'OK',
            message: 'Success get new products',
            data: products,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const getSellingProduct = async (type) => {
    try {
        const topSoldProducts = await Product.find({ type }).sort({ sold: -1 }).limit(10);
        return {
            status: 'OK',
            message: 'Success get selling',
            data: topSoldProducts,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

// đánh giá sản phẩm
const createVote = (newVote) => {
    return new Promise(async (resolve, reject) => {
        const { productId, userId, nameUser, avatarUser, rating, comment, images } = newVote;
        try {
            const checkVote = await Review.findOne({
                userId: userId,
                productId: productId,
            });
            if (checkVote !== null && checkVote !== undefined) {
                resolve({
                    status: 'OK',
                    message: 'The vote is already service',
                });
            }
            const newVote = await Review.create({
                productId,
                userId,
                nameUser,
                avatarUser,
                rating: Number(rating),
                comment,
                images: images || [],
            });
            if (newVote) {
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: newVote,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllVotes = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const votes = await Review.find();
            resolve(votes);
        } catch (e) {
            reject(e);
        }
    });
};

const getVotesByProductId = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const votes = await Review.find({ productId });
            resolve(votes);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getDetailsProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType,
    filterByPriceLowToHeight,
    filterByPriceHeightToLow,
    getNewProducts,
    getSellingProduct,
    getAllColor,
    createVote,
    getAllVotes,
    getVotesByProductId,
    searchProductsByTypeAndName,
};
