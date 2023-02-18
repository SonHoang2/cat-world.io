const jwt = require('jsonwebtoken');

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(token);
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login')
            } else {
                console.log(decodeToken);
                next();
            }
        })
    } else {
        res.redirect('/login')
    }
}