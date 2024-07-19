const UserService = require('../services/UserService');
const JwtServices = require('../services/JwtServices');

const createUser = async (req, res) => {
    try {
        const { name, password, confirmPassword } = req.body;
        if (!name || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Insufficient value entered ',
            });
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Password unlike confirmPassword',
            });
        }
        const response = await UserService.createUser(req.body); // nếu k rơi vào trường hợp nào thì cho
        // req.body qua thằng UserService
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Insufficient value entered',
            });
        }
        const response = await UserService.loginUser(req.body); // nếu k rơi vào trường hợp nào thì cho
        // req.body qua thằng UserService
        const { refresh_token, ...newResponse } = response;
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samesite: 'strict',
            path: '/',
        });
        return res.status(200).json({ ...newResponse, refresh_token }); // lưu ý refresh token ở đây
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId do not exist',
            });
        }
        const response = await UserService.updateUser(userId, data); // nếu k rơi vào trường hợp nào thì cho
        //userId qua thằng UserService
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId do not exist delete',
            });
        }
        const response = await UserService.deleteUser(userId); // nếu k rơi vào trường hợp nào thì cho
        //userId qua thằng UserService
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId do not exist getDetail',
            });
        }
        const response = await UserService.getDetailsUser(userId); // nếu k rơi vào trường hợp nào thì cho
        //userId qua thằng UserService
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        let token = req.headers.token.split(' ')[1];
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required',
            });
        }
        const response = await JwtServices.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const logUotUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: 'OK',
            message: 'Log out success',
        });
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids;

        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids undefined',
            });
        }
        const response = await UserService.deleteManyUser(ids);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const findNameUser = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The userId is required',
            });
        }
        // Loại bỏ khoảng trắng và ký tự xuống dòng
        id = id.trim();
        const response = await UserService.findNameUser(id);
        return res.status(200).json({
            status: 'OK',
            data: response,
        });
    } catch (e) {
        console.error('Error in findNameUser controller:', e.message);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logUotUser,
    deleteMany,
    findNameUser,
};
