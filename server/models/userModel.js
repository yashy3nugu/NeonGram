const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "email cannot be empty"],
  },
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
    required: [true, "username cannot be empty"],
  },
  hashedPassword: {
    type: String,
    minlength: 6,
    required: [true, "password is required"],
  },
  bio: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  profilePictureId: {
    type: String,
    default: "",
  },
  followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],

  following: [{ type: mongoose.Types.ObjectId, ref: "User" }],

  saved: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
});

userSchema.index({ username: "text" });

userSchema.methods.comparePassword = async function (
  enteredPassword,
  savedPassword
) {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "token cannot be empty"],
  },
});

exports.User = mongoose.model("User", userSchema);
exports.RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
