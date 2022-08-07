const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const { Comment } = require("../models/commentModel");
const { commentController } = require("../controllers/commentController");

const router = express.Router();

// post a comment for a post
router.post("/add/:postID", authenticateToken, commentController.addComment);

// get comments for a post
router.get("/:postID", authenticateToken.commentController.getCommentsForPost);

module.exports = router;
