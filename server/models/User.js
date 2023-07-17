const bcrypt = require('bcrypt');
const crypto = require('crypto');
const generator = require('generate-password');
const pool = require('./db');

const findByEmail = async (email) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
    return rows;
}

const showID = async (id) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = '${id}'`);
    return rows[0];
}

module.exports.edit = async (item) => {
    // hash password
    if (item.password) {
        const salt = await bcrypt.genSalt();
        item.password = await bcrypt.hash(item.password, salt);
        const [rows] = await pool.query(
            `UPDATE users SET name = '${item.name}', address = '${item.address}', phone = '${item.phone}', email = '${item.email}', password = '${item.password}' WHERE email = '${item.email}'`
        );
        return rows
    } else {
        const [rows] = await pool.query(
            `UPDATE users SET name = '${item.name}', address = '${item.address}', phone = '${item.phone}', email = '${item.email}' WHERE email = '${item.email}'`
        );
        return rows

    }
}

module.exports.create = async (name, email, password) => {
    // hash password 
    const uuid = crypto.randomUUID();
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const [rows] = await pool.query(`INSERT INTO users(id,name,email,password) VALUES ('${uuid}','${name}','${email}','${password}')`)
    return showID(uuid)
}

module.exports.login = async (email, password) => {
    let user = await findByEmail(email);
    if (user.length !== 0) {
        user = user[0];
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

module.exports.google_login = async (name, email) => {
    try {
        let user = await findByEmail(email);
        if (user.length === 0) {
            let password = generator.generate({
                length: 10,
                numbers: true
            });
            const uuid = crypto.randomUUID();
            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);
            await pool.query(`INSERT INTO users(id,name,email,password) VALUES ('${uuid}','${name}','${email}','${password}')`);
        }
        user = await findByEmail(email);
        console.log(user[0]);
        return user[0]
    } catch (err) {
        console.log(err);
    }
}

module.exports.updateAvatar = async (id, path) => {
    try {
        const [rows] = await pool.query(`UPDATE users SET avatar = '${path}' WHERE id = '${id}'`);
        return showID(id);
    } catch (err) {
        console.log(err);
    }
}

module.exports.resetPassword = async (email, password) => {
    try {
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
        const [rows] = await pool.query(`UPDATE users SET password = '${password}' WHERE email = '${email}'`);
        return findByEmail(email);
    } catch (err) {
        console.log(err);
    }
}

module.exports.showID = showID;
module.exports.findByEmail = findByEmail;