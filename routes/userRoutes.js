const express = require("express");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const {generateAccessToken, generateRefreshToken, authenticateToken} = require("../utils/jwt");

const router = express.Router();

const {User,RefreshToken} = require("../models/userModel");

router.post("/register", (req, res, next) => {

    


    const { email, fname, lname, username, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password);


    User.findOne({ $or: [{ username: username }, { email: email }] }, (err, foundUser) => {

        if (foundUser) {
            res.status(400).send("User exists");
        } else {

            User.create({email, fname, lname, username, hashedPassword}, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(`User ${username} saved successfully`);
                    next();
                }
            })

        }
    })




});

router.post("/login", (req,res,next) => {

    const {username,password} = req.body;

    User.findOne({username: username}, (err,foundUser) => {
        
        if(foundUser){

            if(bcrypt.compareSync(password,foundUser.hashedPassword)){

                const accessToken = generateAccessToken({name: username});
                const refreshToken = generateRefreshToken({name: username});

                RefreshToken.create({token: refreshToken});


                res.send({
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
                next();

            }
        else if(err){
            console.log(err);

            res.status(500).send("Internal server error");
            next();
        }

        }
        else {
            res.status(400).send("Invalid username");
            next();
        }
    })

    

});

router.post("/token", (req,res,next) => {
    const refreshToken = req.body.refreshToken;

    if(refreshToken == null){
        res.status(401).send("Refresh token required");
    }
    
    refreshTokenDoc.findOne({token: refreshToken}, (err,foundToken) => {
        if(err){
            console.log(err);
            res.status(500).send("Internal server error");
            next();
        }

        if(foundToken){
            
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,user) => {
                if(err){
                    console.log(err);
                    res.status(403).send("Invalid refresh token");
                    next();
                }

                const accessToken = generateAccessToken({name: user.name});

                res.send(accessToken);
                next();
            })
        }
    })

});

router.post("/verify", authenticateToken, (req,res,next) => {
    console.log("verified jwt")
    res.sendStatus(200);
    next();
})

module.exports = router;