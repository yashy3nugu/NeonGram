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
  .post(authenticateToken, upload.single("postImage"), postController.createPost)
  .delete(authenticateToken, postController.deletePost);

// get all posts for a user's feed for infinite scroll pagination. Latests post are shown everytime.
router.get(
  "/following",
  authenticateToken,
  postController.getAllPostsFromFollowing
);

// Add a like to a post
router.post("/:postId/like", authenticateToken, postController.likePost);

// Add a dislike to a post
router.post("/:postId/dislike", authenticateToken, postController.dislikePost);

// Remove a reaction to a post
router.post(
  "/:postId/removeReaction/:reaction",
  authenticateToken,
  postController.removeReaction
);

// get posts of a username
router.get(
  "/user/:username",
  authenticateToken,
  postController.getPostsFromUsername
);

// add the post to saved posts of user
router.patch("/:postId/save", authenticateToken, postController.savePost);

//  delete the post
router.delete("/:postId", authenticateToken, postController.deletePost);

module.exports = router;
