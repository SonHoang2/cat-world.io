const pool = require('./db');

module.exports.show = async () => {
    const [rows] = await pool.query(`SELECT * FROM catdata`);
    return rows
}

module.exports.update = async (id, quantity) => {
    await pool.query(`UPDATE catdata SET quantity = quantity - ${quantity} WHERE id = '${id}'`);
}