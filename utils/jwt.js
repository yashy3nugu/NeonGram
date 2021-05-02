const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
};

exports.generateRefreshToken = (user) => {
    
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

};

exports.authenticateToken = (req,res,next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        res.sendStatus(401);

    };

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            console.log(err);
            res.sendStatus(403);
            next();
        }
        req.user = user;
        next();
    })
}