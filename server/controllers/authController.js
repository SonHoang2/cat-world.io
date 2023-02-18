const pool = require('../models/User');
var validator = require('validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
require('dotenv/config');

function handleErrors(err) {
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

const maxAge = 86400 * 3;
function createToken(id) {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res) => {
    res.json('signup');
}

module.exports.login_get = (req, res) => {
    res.json('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, password} = req.body;
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
        const user = await User.create(email,password);
        const token = createToken(user.id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: user.id})
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
        let user = await User.login(email, password);
        const token = createToken(user.id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: user.id})
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors});
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/')
}

