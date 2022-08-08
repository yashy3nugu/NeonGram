const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.post("/:postID", authenticateToken, commentController.addComment);

router.get("/:postID", authenticateToken, commentController.getCommentsForPost);

module.exports = router;
