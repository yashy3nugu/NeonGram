const express = require("express");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const multer = require("multer");
const sharp = require("sharp");
const streamifier = require("streamifier");
const { cloudinary } = require("../config/cloudinary");
const {
  generateAccessToken,
  generateRefreshToken,
  authenticateToken,
} = require("../utils/jwt");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

const { User, RefreshToken } = require("../models/userModel");
const mongoose = require("mongoose");

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
});

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/token", authController.refreshToken);

router.post("/verify", authenticateToken, (req, res, next) => {
  User.findById(req.user._id)
    .select("username fname lname email bio profilePicture followers following")
    .exec((err, foundUser) => {
      if (err) {
        res.sendStatus(500);
      }

      res.send(foundUser);
    });
});

// get details of user from username
router.get(
  "/details/:username",
  authenticateToken,
  userController.getUserFromUsername
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

router.patch(
  "/follow/:followingUserId",
  authenticateToken,
  userController.followUser
);

router.patch(
  "/unfollow/:followingUserId",
  authenticateToken,
  userController.unfollowUser
);

module.exports = router;
