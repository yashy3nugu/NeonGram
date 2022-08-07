const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const { User } = require("../models/userModel");

exports.registerUser = (req, res) => {
  const { email, fname, lname, username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password);

  User.findOne(
    { $or: [{ username: username }, { email: email }] },
    (err, foundUser) => {
      if (foundUser) {
        res.status(400).send("User exists");
      } else {
        User.create(
          { email, fname, lname, username, hashedPassword },
          (err) => {
            if (err) {
              console.log(err);
            } else {
              res.send(`User ${username} saved successfully`);
            }
          }
        );
      }
    }
  );
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (err, foundUser) => {
    if (foundUser) {
      if (bcrypt.compareSync(password, foundUser.hashedPassword)) {
        const accessToken = generateAccessToken({ _id: foundUser._id });
        const refreshToken = generateRefreshToken({ _id: foundUser._id });

        RefreshToken.create({ token: refreshToken });

        res.send({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        res.sendStatus(400);
      }
    } else if (err) {
      console.log(err);

      res.sendStatus(500);
    } else {
      res.status(400).send("Invalid username");
    }
  });
};

exports.refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;

  if (refreshToken == null) {
    res.status(401).send("Refresh token required");
  }

  refreshTokenDoc.findOne({ token: refreshToken }, (err, foundToken) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }

    if (foundToken) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) {
            console.log(err);
            res.status(403).send("Invalid refresh token");
          }

          const accessToken = generateAccessToken({ name: user.name });

          res.send(accessToken);
        }
      );
    }
  });
};

exports.verifyToken = (req, res, next) => {
  User.findById(req.user._id)
    .select("username fname lname email bio profilePicture followers following")
    .exec((err, foundUser) => {
      if (err) {
        res.sendStatus(500);
      }

      res.send(foundUser);
    });
};
