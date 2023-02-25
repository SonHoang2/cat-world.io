const CatData = require('../models/Catdata');

module.exports.show_get = async (req, res) => {
    let catdata = await CatData.show();
    res.json(catdata);
}