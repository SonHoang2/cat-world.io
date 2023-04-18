const bcrypt = require('bcrypt');
const crypto = require('crypto');
const pool = require('./db');

const findByEmail = async (email) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
    return rows;
}

module.exports.show = async (id) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = '${id}'`);
    return rows[0];
}

module.exports.edit = async (item) => {
    // hash password 
    const salt = await bcrypt.genSalt();
    item.password = await bcrypt.hash(item.password, salt);

    const [rows] = await pool.query(
        `UPDATE users SET name = '${item.name}', bio = '${item.bio}', phone = '${item.phone}', email = '${item.email}', password = '${item.password}' WHERE id = '${item.userID}'`
    );
    return rows
}

module.exports.findByEmail = findByEmail;

module.exports.create = async (name, email, password) => {
    // hash password 
    const uuid = crypto.randomUUID();
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const [rows] = await pool.query(`INSERT INTO users(id,name,email,password) VALUES ('${uuid}','${name}','${email}','${password}')`)
    return {
        id: uuid
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

