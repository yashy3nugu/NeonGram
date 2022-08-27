const express = require("express");

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

router.post("/verify", authenticateToken, authController.verifyToken);

router.get(
  "/details/:username",
  authController.protectRoutes,
  userController.getUserFromUserName
);

router.patch(
  "/updateDetails",
  authController.protectRoutes,
  userController.updateUserDetails
);

router.post(
  "/addProfilePic",
  authController.protectRoutes,
  upload.single("profilePicture"),
  userController.uploadProfilePicture
);

router.delete(
  "/deleteProfilePic",
  authController.protectRoutes,
  userController.deleteProfilePicture
);

// add partial searching
router.get("/search", authController.protectRoutes, userController.searchUsers);

router.post("/follow", authController.protectRoutes, userController.followUser);

router.post(
  "/unfollow",
  authController.protectRoutes,
  userController.unfollowUser
);

module.exports = router;
