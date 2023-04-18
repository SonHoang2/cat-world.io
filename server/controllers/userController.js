const User = require('../models/User');
const authController = require('./authController');
const validator = require('validator');

module.exports.show = async (req,res) => {
    const {userID} = req.body;
    try {
        const data = await User.show(userID)
        console.log(data);
        res.json(data);
    }
    catch(err) {
        console.log(err);
    }
}

module.exports.edit = async (req, res) => {
    const user = req.body
    console.log(user);
    try {
        if (!validator.isEmail(user.email)) {
            throw Error('invalid email');
        }
        if (user.password.length < 6) {
            throw Error('invalid password')
        }
        const data = await User.edit(user)
        res.json("success")
    }
    catch(err) {
        const errors = authController.handleErrors(err);
        res.status(400).json({errors});
    }
}