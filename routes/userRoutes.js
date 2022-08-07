const express = require("express");
const bcrypt = require("bcryptjs");

const multer = require("multer");

const { authenticateToken } = require("../utils/jwt");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
});

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/token", authController.refreshToken);

router.post("/verify", authenticateToken, authController.verifyToken);

// get details of user from username
router.get(
  "/details/:username",
  authenticateToken,
  userController.getUserFromUserName
);

router.patch(
  "/updateDetails",
  authenticateToken,
  userController.updateUserDetails
);

router.post(
  "/addProfilePic",
  authenticateToken,
  upload.single("profilePicture"),
  userController.uploadProfilePicture
);

router.delete(
  "/deleteProfilePic",
  authenticateToken,
  userController.deleteProfilePicture
);

// add partial searching
router.get("/search", authenticateToken, userController.searchUsers);

router.post("/follow", authenticateToken, userController.followUser);

router.post("/unfollow", authenticateToken, userController.unfollowUser);

module.exports = router;
