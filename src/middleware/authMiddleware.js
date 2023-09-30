const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleware = (req,res,next) => {
    console.log('checkToken',req.headers.token);
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token,process.env.ACCESS_TOKEN,function(err,user){
        if(err){
            return res.status(404).json({
                message:'The author 1 err verify',
                status:'ERR'
            })
        }
        const {payload} = user
        console.log('user',user);
        if(payload?.isAdmin){
            next()
        }else{
            return res.status(404).json({
                message:'The author user err',
                status:'ERR'
            })
        }
        console.log('user',user);
    })
}

module.exports = {
    authMiddleware
}