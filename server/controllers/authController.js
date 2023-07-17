const validator = require('validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const client = require('../models/redisDB')
require('dotenv/config');

const handleErrors = err =>{
    console.log(err.message, err.code);
    let errors = { email: "", password: "", confirmPassword: "", OTP: ""};
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
    if (err.message === 'Email not exists') {
        errors.email = "Email not exists";
    }
    if (err.message === 'invalid confirm password') {
        errors.confirmPassword = "Password and confirm password does not match";
    }
    // OTP
    if (err.message === 'OTP is not correct') {
        errors.OTP = "OTP is not correct";
    }
    if (err.message === 'code is expired') {
        errors.OTP = "code is expired";
    }
    return errors;
}

function createOTP() {
    return Math.floor(100000 + Math.random() * 900000)
}

function createToken(id, email, name, address, phone, avatar) {
    return jwt.sign({id, email, name, address, phone, avatar}, process.env.JWT_SECRET,{
        expiresIn: 86400 * 3
    })
}

module.exports = {createToken, handleErrors}

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
    const {name, email} = req.body;
    try {
        const user = await User.google_login(name, email);
        const token = createToken(user.id, user.email, user.name, user.address, user.phone, user.avatar);
        console.log(token);
        res.status(201).json({jwt: token})
    } catch (err) {
        console.log(err);
    }
}

module.exports.sendVerificationCode = async (req, res) => {
    try {
        const {email} = req.body
        if (!validator.isEmail(email)) throw Error('invalid email');
        const user = await User.findByEmail(email);
        if (user.length === 0) throw Error('Email not exists');
        const OTP = createOTP();
        console.log(OTP);
        await client.set(email, OTP);
        client.expire(email, 120)
        console.log(process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            }
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Verification code",
            html: `<b>Your reset password code is ${OTP}</b>`,
        });
        console.log("Message sent:" + info.messageId);
        res.status(200).json({});
    } catch (err) {
        const errors = handleErrors(err);
        console.log(err);
        res.status(400).json({errors});
    }
}

module.exports.checkVerificationCode = async (req, res) => {
    try {
        const {email, OTP} = req.body;
        const value = await client.get(email);
        if (!value) throw Error('code is expired');
        if (OTP !== value) throw Error('OTP is not correct');
        let user = await User.findByEmail(email);
        user = user[0];
        const token = createToken('you have permission');
        res.status(200).json({token_P: token})
    } catch (err) {
        const errors = handleErrors(err);
        console.log(err);
        res.status(400).json({errors});
    }
}

module.exports.resetPassword = async (req, res) => {
    try {
        const {email, password, confirmPassword} = req.body;
        if (!email) throw Error();
        if (password.length < 6) throw Error('invalid password');
        if (password !== confirmPassword) throw Error('invalid confirm password');
        let user = await User.resetPassword(email, password);
        user = user[0];
        console.log(user);
        const token = createToken(user.id, user.email, user.name, user.address, user.phone, user.avatar);
        res.status(200).json({jwt: token});
    } catch (err) {
        const errors = handleErrors(err);
        console.log(err);
        res.status(400).json({errors});
    }
}

