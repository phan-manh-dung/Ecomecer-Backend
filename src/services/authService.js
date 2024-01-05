const User = require('../models/UserModel')

const { generalAccessToken, refreshAccessToken } = require('./JwtServices')


const loginSuccessService = (id) => new Promise(async (resolve,reject) => {
    try {
        let checkUser = await User.findOne({
            _id: id
        })
        if(checkUser === null){
            resolve({
                status:'ERR',
                message:'The user is not database authService'
            })
        }

         const access_token = await generalAccessToken({
                id:checkUser.id,
                isAdmin:checkUser.isAdmin
            })
            const refresh_token = await refreshAccessToken({
                id:checkUser.id,
                isAdmin:checkUser.isAdmin
            })

             resolve({
                status: 'OK',
                message: 'Success',
                access_token,
                refresh_token,
                userId: checkUser.id, 
                })

        resolve(checkUser)
    } catch (error) {
        reject({
            err:2,
            msg:'fail service'
        })
    }
})


module.exports = {
    loginSuccessService
}