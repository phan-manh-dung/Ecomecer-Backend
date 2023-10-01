
const ProductService = require('../services/ProductService')

const createProduct = async (req,res) => {
    try{
        const {name ,image,type,price,countInStock,rating,description,color,discount,sold} = req.body
        if(!name || !image || !type || !price ||!countInStock || !rating || !description || !color || !discount
            || !sold){
            return res.status(200).json({
                status:'ERR',
                message:'Input product error'
            })
        }
         const response = await ProductService.createProduct(req.body) // nếu k rơi vào trường hợp nào thì cho 
         // req.body qua thằng UserService
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message:e
        })
    }
}

const updateProduct = async (req,res) => {
    try{
        const productId = req.params.id
        const data = req.body
        if(!productId){
              return res.status(200).json({
                status:'ERR',
                message:'The productID do not exist'
            })
        }
         const response = await ProductService.updateProduct(productId,data) // nếu k rơi vào trường hợp nào thì cho 
         //userId qua thằng UserService
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message:e
        })
    }
}

const deleteProduct= async (req,res) => {
    try{
        const productId = req.params.id
        if(!productId){
              return res.status(200).json({
                status:'ERR',
                message:'The productId do not exist delete'
            })
        }
         const response = await ProductService.deleteProduct(productId) // nếu k rơi vào trường hợp nào thì cho 
         //userId qua thằng UserService
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message:e
        })
    }
}

const getDetailsProduct = async (req,res) => {
    try{
        const productId = req.params.id
        if(!productId){
              return res.status(200).json({
                status:'ERR',
                message:'The productId do not exist getDetail'
            })
        }
         const response = await ProductService.getDetailsProduct(productId) // nếu k rơi vào trường hợp nào thì cho 
         //userId qua thằng UserService
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message:e
        })
    }
}

const getAllProduct = async (req,res) => {
    try{
        const {limit , page,sort,filter} = req.query
         const response = await ProductService.getAllProduct(Number(limit) || 8 ,Number(page) || 0,sort,filter) 
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message:e
        })
    }
}


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getDetailsProduct,
    getAllProduct
}