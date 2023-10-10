const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleware = (req,res,next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token,process.env.ACCESS_TOKEN,function(err,user){
        if(err){
            return res.status(404).json({
                message:'The author 1 err verify',
                status:'ERR'
            })
        }
        if(user?.isAdmin){
            next()
        }else{
            return res.status(404).json({
                message:'The author user err',
                status:'ERR'
            })
        }
    })
}

const authUserMiddleware = (req,res,next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token,process.env.ACCESS_TOKEN,function(err,user){
        if(err){
            return res.status(404).json({
                message:'The author 1 err verify authUser',
                status:'ERR'
            })
        }
        if(user?.isAdmin){
            next()
        }else{
            return res.status(404).json({
                message:'The author user err',
                status:'ERR'
            })
        }
    })
}

module.exports = {
    authMiddleware,
    authUserMiddleware
}