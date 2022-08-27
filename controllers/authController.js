const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
  decodeToken,
} = require("../utils/jwt");
const { User } = require("../models/userModel");
const { RefreshToken } = require("../models/userModel");

/////////////////////////////////////////////////////
// Register new user
exports.registerUser = async (req, res) => {
  try {
    const { email, fname, lname, username, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password);

    let foundUser;

    foundUser = await User.findOne({ username: username }, { email: email });
    if (foundUser) {
      res.status(400).send({ message: "Username or email already exists" });
    } else {
      await User.create({
        email,
        fname,
        lname,
        username,
        hashedPassword,
      });
      res.status(201).send(`User ${username} saved successfully`);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

/////////////////////////////////////////////////////
// Login user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    if (user) {
      if (bcrypt.compareSync(password, user.hashedPassword)) {
        const accessToken = generateAccessToken({ _id: user._id });
        const refreshToken = generateRefreshToken({ _id: user._id });

        RefreshToken.create({ token: refreshToken });

        res.send({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        res.sendStatus(400);
      }
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

/////////////////////////////////////////////////////
// Verify JWT token
exports.verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user).select(
      "username fname lname email bio profilePicture followers following"
    );

    res.send(user);
  } catch (err) {
    res.sendStatus(500);
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
      return res.status(401).send("Unauthorized");
    }

    req.user = _id;

    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};
