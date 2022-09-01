const express = require("express");
const multer = require("multer");
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
});
const router = express.Router();

router
  .route("/")
  .get(authController.protectRoutes, postController.getAllPosts)
  .post(
    authController.protectRoutes,
    upload.single("postImage"),
    postController.createPost
  )
  .delete(authController.protectRoutes, postController.deletePost);

router.get(
  "/following",
  authController.protectRoutes,
  postController.getAllPostsFromFollowing
);

router.post("/:postId/like", authController.protectRoutes, postController.likePost);

router.post("/:postId/dislike", authController.protectRoutes, postController.dislikePost);

router.post(
  "/:postId/removeReaction/:reaction",
  authController.protectRoutes,
  postController.removeReaction
);

router.get(
  "/user/:username",
  authController.protectRoutes,
  postController.getPostsFromUsername
);

router.patch("/:postId/save", authController.protectRoutes, postController.savePost);

router.delete("/:postId", authController.protectRoutes, postController.deletePost);

module.exports = router;
