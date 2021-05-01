const express = require("express");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const {generateAccessToken} = require("../utils/jwt");

const router = express.Router();

const User = require("../models/userModel");

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

                console.log(accessToken)

            }


        }
        else {
            res.status(400).send("Invalid username")
        }
    })

    

})

module.exports = router;