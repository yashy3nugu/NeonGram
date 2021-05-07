const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { authenticateToken } = require("../utils/jwt");
const { Post } = require("../models/postModel");
const { User } = require("../models/userModel");
const { Comment } = require("../models/commentModel");

const router = express.Router();

router.post("/add/:postID", authenticateToken, (req, res, next) => {
    const {postId} = req.params;

    Comment.create({content: req.body.content, post: postId, user: req.user._id}, (err) => {
        if(err) {
            res.sendStatus(500);
            next();
        } else {
            res.sendStatus(201);
            next();
        }
    })
})

module.exports = router;