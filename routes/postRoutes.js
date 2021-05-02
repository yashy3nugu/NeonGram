const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const {authenticateToken} = require("../utils/jwt");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
})

const imageFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

//new Date().toISOString().replace(/:/g, '-') required because windows OS does not accept path with ':'

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 100
}});
const router = express.Router();

router.post("/createPost", upload.single('postImage'), (req,res, next) => {
    console.log(req.body.text);
    console.log(req.file)

    res.sendStatus(201);
    next();
});

module.exports = router;