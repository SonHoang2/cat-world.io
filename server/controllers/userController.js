const User = require('../models/User');

module.exports.show = async (req,res) => {
    const {userID} = req.body;
    try {
        const data = await User.show(userID)
        console.log(data);
        res.json(data);
    }
    catch(err) {
        console.log(err);
    }
}

module.exports.edit = async (req, res) => {
    const user = req.body
    console.log(user);
    try {
        const data = await User.edit(user)
        res.json(data)
    }
    catch(err) {
        console.log(err);
    }
}