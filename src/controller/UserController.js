const UserService = require('../services/UserService')
const JwtServices = require('../services/JwtServices')

const createUser = async (req,res) => {
    try{
        const {name ,email,password,confirmPassword,phone} = req.body
         const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
         const isCheckEmail = reg.test(email)
        if(!name || !email || !password || !confirmPassword ||!phone){
            return res.status(200).json({
                status:'ERR',
                message:'Insufficient value entered'
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status:'ERR',
                message:'Data is not email'
            })
        }else if(password !== confirmPassword){
            return res.status(200).json({
                status:'ERR',
                message:'Password unlike confirmPassword'
            })
        }
         const response = await UserService.createUser(req.body) // nếu k rơi vào trường hợp nào thì cho 
         // req.body qua thằng UserService
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message:e
        })
    }
}

const loginUser = async (req,res) => {
    try{
        const {name ,email,password,confirmPassword,phone} = req.body
         const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
         const isCheckEmail = reg.test(email)
        if(!name || !email || !password || !confirmPassword ||!phone){
            return res.status(200).json({
                status:'ERR',
                message:'Insufficient value entered'
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status:'ERR',
                message:'Data is not email'
            })
        }else if(password !== confirmPassword){
            return res.status(200).json({
                status:'ERR',
                message:'Password unlike confirmPassword'
            })
        }
         const response = await UserService.loginUser(req.body) // nếu k rơi vào trường hợp nào thì cho 
         // req.body qua thằng UserService
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message:e
        })
    }
}
const updateUser = async (req,res) => {
    try{
        const userId = req.params.id
        const data = req.body
        if(!userId){
              return res.status(200).json({
                status:'ERR',
                message:'The userId do not exist'
            })
        }
         const response = await UserService.updateUser(userId,data) // nếu k rơi vào trường hợp nào thì cho 
         //userId qua thằng UserService
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message:e
        })
    }
}

const deleteUser = async (req,res) => {
    try{
        const userId = req.params.id
        if(!userId){
              return res.status(200).json({
                status:'ERR',
                message:'The userId do not exist delete'
            })
        }
         const response = await UserService.deleteUser(userId) // nếu k rơi vào trường hợp nào thì cho 
         //userId qua thằng UserService
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message:e
        })
    }
}

const getAllUser = async (req,res) => {
    try{
         const response = await UserService.getAllUser() 
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message:e
        })
    }
}

const getDetailsUser = async (req,res) => {
    try{
        const userId = req.params.id
        if(!userId){
              return res.status(200).json({
                status:'ERR',
                message:'The userId do not exist getDetail'
            })
        }
         const response = await UserService.getDetailsUser(userId) // nếu k rơi vào trường hợp nào thì cho 
         //userId qua thằng UserService
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message:e
        })
    }
}

const refreshToken = async (req,res) => {
    try{
        const token = req.headers.token.split(' ')[1]
        if(!token){
              return res.status(200).json({
                status:'ERR',
                message:'The token is required'
            })
        }
         const response = await JwtServices.refreshTokenJwtService(token) // nếu k rơi vào trường hợp nào thì cho 
         //userId qua thằng UserService
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message:e
        })
    }
}



module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken
}