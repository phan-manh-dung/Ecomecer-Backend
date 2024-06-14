const Product = require('../models/ProductModel');

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, color, discount, brand } = newProduct;
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
                price,
                quality: Number(countInStock),
                rating,
                description,
                countInStock,
                color,
                discount: Number(discount),
                brand,
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
};
