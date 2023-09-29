const UserService = require('../services/UserService')
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

module.exports = {
    createUser
}