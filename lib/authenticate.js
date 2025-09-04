const jwt = require('jsonwebtoken');
require('dotenv').config();


const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: 'Please login to access this resource'
        });
    }
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, decoded) => {
        if (err) return res.status(401).json({
            message: 'Invalid token'
        });
        req.user = decoded;
        next();
    });
}

module.exports = authenticate;

