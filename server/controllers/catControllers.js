const CatData = require('../models/Catdata');

module.exports.show = async (req, res) => {
    let catdata = await CatData.show();
    res.json(catdata);
}