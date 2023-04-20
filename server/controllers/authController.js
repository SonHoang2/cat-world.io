const validator = require('validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
require('dotenv/config');

const handleErrors = err =>{
    console.log(err.message, err.code);
    let errors = { email: "", password: ""};
    
    if (err.message === 'invalid email') {
        errors.email = "please enter a valid email";
    }
    if (err.message === 'invalid password') {
        errors.password = "minimum password length is 6 characters";
    }
    if (err.message === 'that email is already registered') {
        errors.email = "that email is already registered";
    }
    if (err.message === 'incorrect email') {
        errors.email = "that email is not registered";
    }
    if (err.message === 'incorrect password') {
        errors.password = "that password is incorrect";
    }
    return errors;
}

module.exports = {handleErrors}

const maxAge = 86400 * 3;
function createToken(id, email, name, address, phone, avatar) {
    return jwt.sign({id, email, name, address, phone, avatar}, process.env.JWT_SECRET,{
        expiresIn: maxAge
    })
}

module.exports.signup_post = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        if (!validator.isEmail(email)) {
            throw Error('invalid email');
        }
        if (password.length < 6) {
            throw Error('invalid password')
        }
        const checkEmail = await User.findByEmail(email);
        if (checkEmail.length !== 0) {
            throw Error('that email is already registered');
        }
        const user = await User.create(name, email, password);
        const token = createToken(user.id, user.email, user.name, user.address, user.phone, user.avatar);
        res.status(201).json({jwt: token})
    }
    catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({errors});
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body
    try {
        if (!validator.isEmail(email)) {
            throw Error('invalid email');
        }
        if (password.length < 6) {
            throw Error('invalid password')
        }
        const user = await User.login(email, password);
        const token = createToken(user.id, user.email, user.name, user.address, user.phone, user.avatar);
        res.status(201).json({jwt: token})
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors});
    }
}

module.exports.google_login = async (req, res) => {
    const {name, email, avatar} = req.body;
    try {
        const user = await User.google_login(name, email, avatar);
        const token = createToken(user.id, user.email, user.name, user.address, user.phone, user.avatar);
        console.log(token);
        res.status(201).json({jwt: token})
    } catch (err) {
        console.log(err);
    }
}