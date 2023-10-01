const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

 const generalAccessToken = (payload) => {
    const access_token = jwt.sign({
        payload
    },process.env.ACCESS_TOKEN,{expiresIn:'30s'})
    return access_token
}
 const refreshAccessToken = (payload) => {
    const refresh_token = jwt.sign({
        payload
    },process.env.REFRESH_TOKEN,{expiresIn:'365d'})
    return refresh_token
}

 const refreshTokenJwtService = (token) => {
       return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token,process.env.REFRESH_TOKEN, async (err,user) => {
                if(err){
                    resolve({
                        status:'ERROR',
                        message:'The refresh token Jwt not required'
                    })
                }
                const {payload} = user
                const access_token = await generalAccessToken({
                        id:payload?.id,
                        isAdmin:payload?.isAdmin
                    })
                    resolve({
                        status: 'OK',
                        message: 'Success refreshToken',
                        access_token
                    })
                })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    generalAccessToken ,
    refreshAccessToken,
    refreshTokenJwtService
}
