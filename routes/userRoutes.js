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

                const accessToken = generateAccessToken({_id: foundUser._id});
                const refreshToken = generateRefreshToken({_id: foundUser._id });

                RefreshToken.create({token: refreshToken});


                res.send({
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
                next();

            }
            else {
                res.sendStatus(400);
            }
        }
        else if(err){
            console.log(err);

            res.sendStatus(500);
            next();
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

    User.findOne({_id:req.user._id}, (err,foundUser) => {

        if(err){
            res.sendStatus(500);
        }

        else {
            const {_id,email,fname,lname,username} = foundUser;

            res.send({_id,email,fname,lname,username});
            next();
        }
        
    })
    
})

// get details of user from username
router.get("/details/:username", authenticateToken, (req,res,next) => {
    
    const { username } = req.params;


    User.findOne({username: username})
    .select("username fname lname email")
    .exec((err, foundUser) => {
            if(foundUser) {

                res.send(foundUser);
                next();

            }
            else if(err) {
                res.sendStatus(500);
                next();
            }
            else {
                res.sendStatus(400);
                next();
            }
    })

})

module.exports = router;