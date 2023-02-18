const bcrypt = require('bcrypt');
const crypto = require('crypto');
const pool = require('./db');

const findByEmail = async (email) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
        return rows;
}

module.exports.findByEmail = findByEmail;

module.exports.create = async (email, password) => {
    // hash password 
    const uuid = crypto.randomUUID();
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const [rows] = await pool.query(`INSERT INTO users(id,email,password) VALUES ('${uuid}','${email}','${password}')`)
    return {
        id: uuid,
        email: email,
        password: password,
    }
}

module.exports.login = async (email, password) => {
    let user = await findByEmail(email);
    if (user.length !== 0) {
        user = user[0];
        console.log(user);
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        } else {
            throw Error('incorrect password');
        }
    } else {
        throw Error('incorrect email');
    }
}