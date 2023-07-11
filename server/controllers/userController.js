const User = require('../models/User');
const authController = require('./authController');
const validator = require('validator');

module.exports.edit = async (req, res) => {
    const user = req.body
    console.log(user);
    try {
        if (!validator.isEmail(user.email)) {
            throw Error('invalid email');
        }
        if (user.password && user.password.length < 6) {
            throw Error('invalid password')
        }
        const data = await User.edit(user)
        res.json("success")
    }
    catch(err) {
        const errors = authController.handleErrors(err);
        console.log(err);
        res.status(400).json({errors});
    }
}

module.exports.uploadImg = (req, res) => {
    let {path} = req.file;
    path = path.replace("\\", '/')
    res.status(200).json({path: path})
}

module.exports.updateAvatar = async (req, res) => {
    try {
        const {id, path} = req.body;
        const user = await User.updateAvatar(id, path);
        const token = authController.createToken(user.id, user.email, user.name, user.address, user.phone, user.avatar);
        res.status(200).json({jwt: token})
    } catch (err) {
        console.log(err);
    }
}