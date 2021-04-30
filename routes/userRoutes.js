const express = require("express");
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


const router = express.Router();

router.post("/register",(req,res,next) => {
    console.log(req.body);
    const hash = bcrypt.hashSync(req.body.password);
    console.log(hash);
    res.send("no users");
});

module.exports = router;