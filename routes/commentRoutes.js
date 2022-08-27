const express = require("express");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/:postID", authController.protectRoutes, commentController.addComment);

router.get("/:postID", authController.protectRoutes, commentController.getCommentsForPost);

module.exports = router;
