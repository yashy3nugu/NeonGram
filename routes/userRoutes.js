const express = require("express");
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


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

module.exports = router;