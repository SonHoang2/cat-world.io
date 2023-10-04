const CatData = require('../models/Catdata');

module.exports.show = async (req, res) => {
    let catdata = await CatData.show();
    res.json(catdata);
}

module.exports.update = async(req, res) => {
    try {
        const {catInCart} = req.body
        for (let cat of catInCart) {
            console.log(cat);
            await CatData.update(cat.id, cat.quantity);
        }
        res.json('success');
    } catch (err) {
        console.log(err);
        res.json('failure');
    }
}