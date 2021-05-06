const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const mongoose = require("mongoose");
const { authenticateToken } = require("../utils/jwt");
const { Post } = require("../models/postModel");
const { User } = require("../models/userModel");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + req.user.name + '-' + file.originalname);
    }
})

const imageFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

//new Date().toISOString().replace(/:/g, '-') required because windows OS does not accept path with ':'

const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 100
    }
});
const router = express.Router();

router.post("/createPost", authenticateToken, upload.single('postImage'), (req, res, next) => {


    User.findOne({ username: req.user.name }, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            next();
        }

        if (foundUser) {
            Post.create({ text: req.body.text, postImage: req.file.path, user: mongoose.Types.ObjectId(foundUser._id), username: req.user.name }, (err) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    next();
                } else {
                    res.sendStatus(201);
                    next();
                }
            })
        }
    })



});

router.get("/getAll", authenticateToken, (req, res, next) => {
    Post.find({}, (err, foundPosts) => {
        if (err) {
            res.sendStatus(400);
            next();
        }

        res.send(foundPosts);
        next();
    })
})

router.post("/:postId/like", authenticateToken, (req, res, next) => {
    const { postId } = req.params;


    User.findOne({ username: req.user.name }, (err, foundUser) => {

        if (err) {
            res.sendStatus(500);
        }



        Post.updateOne({ _id: postId }, { $addToSet: { likes: mongoose.Types.ObjectId(foundUser._id) }, $pull: { dislikes: mongoose.Types.ObjectId(foundUser._id)} }, (err) => {
            if (err) {
                console.log(err)
                res.sendStatus(500);
                next();
            } else {
                res.sendStatus(200);
                next();
            }

        })




    })


});

router.post("/:postId/dislike", authenticateToken, (req, res, next) => {
    const { postId } = req.params;


    User.findOne({ username: req.user.name }, (err, foundUser) => {

        if (err) {
            res.sendStatus(500);
        }



        Post.updateOne({ _id: postId }, { $addToSet: { dislikes: mongoose.Types.ObjectId(foundUser._id) }, $pull: { likes: mongoose.Types.ObjectId(foundUser._id)} }, (err) => {
            if (err) {
                console.log(err)
                res.sendStatus(500);
                next();
            } else {
                res.sendStatus(200);
                next();
            }

        })




    })


})

module.exports = router;