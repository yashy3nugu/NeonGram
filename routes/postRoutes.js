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

// create a post
router.post("/createPost", authenticateToken, upload.single('postImage'), (req, res, next) => {


    User.findOne({ _id: req.user._id }, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            next();
        }

        if (foundUser) {
            Post.create({ text: req.body.text, postImage: req.file.path, user: mongoose.Types.ObjectId(foundUser._id), username:foundUser.username }, (err) => {
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

// get all posts for a user's feed for infinite scroll pagination.
router.get("/", authenticateToken, (req, res, next) => {

    const {lastId} = req.query;

    let filter = {};

    if(lastId){
        filter = {'_id': {'$gt': lastId}}
    }

    Post.find(filter, (err, foundPosts) => {
        if (err) {
            res.sendStatus(400);
            next();
        } else if(!foundPosts){
            res.send({
                posts: {},
                hasNext: 0
            });
        } else {
            res.send({
                posts: foundPosts,
                hasNext: 1
            });
            next();
        }

        
    }).limit(2);
})

// Add a like to a post
router.post("/:postId/like", authenticateToken, (req, res, next) => {
    const { postId } = req.params;


    User.findOne({ _id: req.user._id }, (err, foundUser) => {

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

// Add a dislike to a post
router.post("/:postId/dislike", authenticateToken, (req, res, next) => {
    const { postId } = req.params;


    User.findOne({ _id: req.user._id }, (err, foundUser) => {

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


});

// Remove a reaction to a post
router.post("/:postId/removeReaction/:reaction", authenticateToken, (req,res,next) => {
    const {postId, reaction} = req.params;

    User.findOne({ _id: req.user._id }, (err, foundUser) => {

        if (err) {
            res.sendStatus(500);
        }



        Post.updateOne({ _id: postId }, { $pull: { [reaction] : mongoose.Types.ObjectId(foundUser._id)} }, (err) => {
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

// get posts of a username
router.get("/user/:username", authenticateToken, (req,res,next) => {
    const { username } = req.params;

    User.findOne({username: username}, (err, foundUser) => {

        if(foundUser){

            Post.find({username: username}, (err, foundPosts) => {
                if(err) {
                    res.sendStatus(500);
                    next();
                }
                else {
                    res.send(foundPosts);
                    next();
                }
            })

        } else if(err) {

            res.sendStatus(500);
            next();

        } else {
            res.sendStatus(400);
            next();
        }
    })
})

module.exports = router;