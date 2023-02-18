const pool = require('./db');

module.exports.show = async () => {
    const [rows] = await pool.query('select * FROM catdata');
    return rows
}