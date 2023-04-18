const pool = require('./db');

module.exports.show = async () => {
    const [rows] = await pool.query(`SELECT * FROM catdata`);
    return rows
}
