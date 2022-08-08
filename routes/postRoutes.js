const express = require("express");
const multer = require("multer");
const { authenticateToken } = require("../utils/jwt");
const postController = require("../controllers/postController");

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
});
const router = express.Router();

router
  .route("/")
  .get(authenticateToken, postController.getAllPosts)
  .post(
    authenticateToken,
    upload.single("postImage"),
    postController.createPost
  )
  .delete(authenticateToken, postController.deletePost);

router.get(
  "/following",
  authenticateToken,
  postController.getAllPostsFromFollowing
);

router.post("/:postId/like", authenticateToken, postController.likePost);

router.post("/:postId/dislike", authenticateToken, postController.dislikePost);

router.post(
  "/:postId/removeReaction/:reaction",
  authenticateToken,
  postController.removeReaction
);

router.get(
  "/user/:username",
  authenticateToken,
  postController.getPostsFromUsername
);

router.patch("/:postId/save", authenticateToken, postController.savePost);

router.delete("/:postId", authenticateToken, postController.deletePost);

module.exports = router;
