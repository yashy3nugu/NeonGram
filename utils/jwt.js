const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
}

exports.generateRefreshToken = (user) => {
    
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

}