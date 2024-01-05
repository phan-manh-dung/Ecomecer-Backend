const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const { generalAccessToken, refreshAccessToken } = require('./JwtServices')

const createUser = (newUser) => {
    return new Promise( async(resolve,reject) => {
         const {name,password} = newUser
        try{
            const checkUser = await User.findOne({
                name:name
            })
            if(checkUser !== null){
                await checkUser.save();
                resolve({
                    status:'ERR',
                    message:'The name is already'
                })
            }
            const hash = bcrypt.hashSync(String(password), 10);
            const createUser = await User.create ({
                name,
                password:hash,
            })
            if(createUser){
                resolve({
                    status:'OK',
                    message:'Success user',
                    data:createUser
                })
            }
        }catch(e){
            console.error('Error:', e);
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise( async(resolve,reject) => {
         const {name,password} = userLogin
        try{
            const checkUser = await User.findOne({
                name:name
            })
            if(checkUser === null){
                resolve({
                    status:'ERR',
                    message:'The user is not database'
                })
            }
            const comparePassword = bcrypt.compareSync(password,checkUser.password)
            if(!comparePassword){
                  resolve({
                    status:'ERR',
                    message:'The password or user is incorrect'
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
        }catch(e){
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not exists'
                })
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not exists'
                })
            }

            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete User Success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser =  await User.find()
            resolve({
                status: 'OK',
                message: 'Get all Success',
                data:allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not exists getDetail'
                })
            }
            resolve({
                status: 'OK',
                message: 'Success getDetail',
                data:user
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {

            await User.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteManyUser
}