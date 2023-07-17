const jwt = require('jsonwebtoken')

function VerificationToken (req, res, next) {
    const decode = jwt.verify(req.body.token_P, process.env.JWT_SECRET, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            next()
        };
    });
}


module.exports = VerificationToken