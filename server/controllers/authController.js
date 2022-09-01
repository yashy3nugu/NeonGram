const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
  decodeToken,
} = require("../utils/jwt");
const { User } = require("../models/userModel");
const { RefreshToken } = require("../models/userModel");
const AppError = require("../utils/AppError");

/////////////////////////////////////////////////////
// Register new user
exports.registerUser = async (req, res, next) => {
  try {
    const { email, fname, lname, username, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password);

    let foundUser;

    foundUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (foundUser) {
      return next(new AppError("Username or email already exists", 400));
    }
    const user = await User.create({
      email,
      fname,
      lname,
      username,
      hashedPassword,
    });

    const accessToken = generateAccessToken({ _id: user._id });
    const refreshToken = generateRefreshToken({ _id: user._id });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      accessToken,
      refreshToken,
      user,
    });
  } catch (err) {
    
    next(err);
  }
};

/////////////////////////////////////////////////////
// Login user
exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new AppError("Please provide username and password", 400));
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    if (!(await user.comparePassword(password, user.hashedPassword))) {
      return next(new AppError("Incorrect password", 400));
    }

    const accessToken = generateAccessToken({ _id: user._id });
    const refreshToken = generateRefreshToken({ _id: user._id });

    RefreshToken.create({ token: refreshToken });

    res.send({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

/////////////////////////////////////////////////////
// Verify JWT token
exports.verifyToken = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).select(
      "username fname lname email bio profilePicture profilePictureId followers following"
    );

    res.send(user);
  } catch (err) {
    next(err);
  }
};

/////////////////////////////////////////////////////
// Protect Routes

exports.protectRoutes = async (req, res, next) => {
  try {
    let authToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      authToken = req.headers.authorization.split(" ")[1];
    }

    const { _id } = await decodeToken(authToken);

    const userInstance = await User.findById(_id);

    if (!userInstance) {
      return next(new AppError("You are not authorized. Please login", 401));
    }

    req.user = _id;

    next();
  } catch (err) {
    next(err);
  }
};
