const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { authenticateToken } = require("../utils/jwt");
const { Post } = require("../models/postModel");
const { User } = require("../models/userModel");
const { Comment } = require("../models/commentModel");

const router = express.Router();

// post a comment for a post
router.post("/add/:postID", authenticateToken, (req, res, next) => {
    const {postID} = req.params;
    console.log(postID)

    Comment.create({content: req.body.content, post: postID, user: req.user._id}, (err) => {
        if(err) {
            res.sendStatus(500);
            next();
        } else {
            res.sendStatus(201);
            next();
        }
    })
});

// get comments for a post
router.get("/:postID", authenticateToken, (req, res, next) => {

    const {postID} = req.params;

    // Comment.find({post: postID}, (err, foundComments) => {
    //     if(err) {
    //         res.sendStatus(500);
    //         next();
    //     } else {
    //         console.log(foundComments)
    //         res.send(foundComments);
    //         next();
    //     }
    // })

    Comment.find({post: postID})
    .populate('user', 'username')
    .then( comment => {
        res.send(comment);
        next();
    })

})

module.exports = router;