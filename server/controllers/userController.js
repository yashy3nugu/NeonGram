const sharp = require("sharp");
const streamifier = require("streamifier");
const { cloudinary } = require("../config/cloudinary");
const { User } = require("../models/userModel");
const mongoose = require("mongoose");
const AppError = require("../utils/AppError");

/////////////////////////////////////////////////////
// Get details of user from username
exports.getUserFromUserName = async (req, res, next) => {
  const { username } = req.params;

  try {
    const foundUser = await User.findOne({ username: username }).select(
      "username fname lname email bio profilePicture profilePictureId followers following"
    );

    if (!foundUser) {
      return next(new AppError("User not found", 404));
    }

    res.send(foundUser);
  } catch (err) {
    next(err);
  }
};

/////////////////////////////////////////////////////
// Update user details
exports.updateUserDetails = async (req, res, next) => {
  const { userDetails } = req.body;
  try {
    await User.findByIdAndUpdate(req.user, userDetails);

    res.sendStatus(200);
  } catch {
    next(err);
  }
};

/////////////////////////////////////////////////////
// Upload profile picture and remove old one if exists
exports.uploadProfilePicture = (req, res, next) => {
  const { x, y, width, height } = JSON.parse(req.body.imageSettings);

  sharp(req.file.buffer)
    .extract({ left: x, top: y, width, height })
    .resize(1000, 1000)
    .toFormat("jpeg")
    .jpeg({
      quality: 100,
      force: true,
    })
    .toBuffer()
    .then((data) => {
      //upload to cloudinary
      const upload_stream = cloudinary.uploader.upload_stream(
        {
          folder: "profilePictures",
          unique_filename: true,
        },
        (err, result) => {
          if (err) {
            return next(new AppError("error uploading image", 500));
          }

          //Find user
          User.findById(req.user, (err, foundUser) => {
            const publicId = foundUser.profilePictureId;
            // Delete the previous profile picture
            cloudinary.api.delete_resources([publicId], (err, response) => {
              if (err) {
                return next(new AppError("error deleting image", 500));
              }
              // add the new URL to database

              User.findOneAndUpdate(
                { _id: req.user },

                {
                  profilePicture: result.url,
                  profilePictureId: result.public_id,
                },
                { new: true },
                (err, user) => {
                  if (err) {
                    
                    next(err);
                  }

                  res.status(200).json({
                    status: "success",
                    user,
                  });
                  // res.sendStatus(200);
                }
              );
            });
          });
        }
      );

      streamifier.createReadStream(data).pipe(upload_stream);
    })
    .catch((err) => next(err));
};

/////////////////////////////////////////////////////
// Delete profile picture
exports.deleteProfilePicture = async (req, res, next) => {
  try {
    const { profilePictureId } = await User.findById(req.user).select(
      "profilePictureId"
    );

    await cloudinary.uploader.destroy(profilePictureId);

    const user = await User.findByIdAndUpdate(req.user, {
      profilePicture: "",
      profilePictureId: "",
    },
    {new: true}
    );

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    next(err);
  }
};

/////////////////////////////////////////////////////
// Search for users using regex
exports.searchUsers = async (req, res, next) => {
  try {
    const { username } = req.query;

    const users = await User.find({
      username: { $regex: username, $options: "i" },
    }).select("-hashedPassword -profilePictureId");

    res.send(users);
  } catch (err) {
    next(err);
  }
};

/////////////////////////////////////////////////////
// Follow user
exports.followUser = async (req, res, next) => {
  const { followingUserId } = req.body;

  const followerId = req.user;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const follower = await User.findByIdAndUpdate(
      followerId,
      {
        $addToSet: {
          following: mongoose.Types.ObjectId(followingUserId),
        },
      },
      {
        session,
      }
    );

    const followingUser = await User.findByIdAndUpdate(
      followingUserId,
      {
        $addToSet: {
          followers: mongoose.Types.ObjectId(followerId),
        },
      },
      {
        session,
      }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).send({ follower, followingUser });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    next(err);
  }
};
/////////////////////////////////////////////////////
// Unfollow user
exports.unfollowUser = async (req, res, next) => {
  const { followingUserId } = req.body;

  const followerId = req.user;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const follower = await User.findByIdAndUpdate(
      followerId,
      {
        $pull: {
          following: mongoose.Types.ObjectId(followingUserId),
        },
      },
      { session }
    );

    const followingUser = await User.findByIdAndUpdate(
      followingUserId,
      {
        $pull: {
          followers: mongoose.Types.ObjectId(followerId),
        },
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).send({ follower, followingUser });
  } catch {
    await session.abortTransaction();
    session.endSession();

    next(err);
  }
};
