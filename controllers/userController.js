const sharp = require("sharp");
const streamifier = require("streamifier");
const { cloudinary } = require("../config/cloudinary");
const { User } = require("../models/userModel");
const mongoose = require("mongoose");

/////////////////////////////////////////////////////
// Get details of user from username
exports.getUserFromUserName = async (req, res) => {
  const { username } = req.params;
  // convert to async function

  try {
    const foundUser = await User.findOne({ username: username })
      .select(
        "username fname lname email bio profilePicture profilePictureId followers following"
      )
      .exec();
    if (foundUser) {
      res.send(foundUser);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

/////////////////////////////////////////////////////
// Update user details
exports.updateUserDetails = async (req, res) => {
  const { userDetails } = req.body;
  try {
    await User.findByIdAndUpdate(req.user, userDetails);

    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
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
            res.sendStatus(500);
          }

          //Find user
          User.findById(req.user, (err, foundUser) => {
            if (err) {
              res.sendStatus(500);
            }

            const publicId = foundUser.profilePictureId;
            // Delete the previous profile picture
            cloudinary.api.delete_resources([publicId], (err, response) => {
              if (err) {
                res.sendStatus(500);
              }
              // add the new URL to database
              User.updateOne(
                { _id: req.user },
                {
                  profilePicture: result.url,
                  profilePictureId: result.public_id,
                },
                (err) => {
                  if (err) {
                    console.log(err);
                    res.sendStatus(500);
                  } else {
                    res.sendStatus(200);
                  }
                }
              );
            });
          });
        }
      );

      streamifier.createReadStream(data).pipe(upload_stream);
    })
    .catch((err) => console.log(err));
};

/////////////////////////////////////////////////////
// Delete profile picture
exports.deleteProfilePicture = async (req, res, next) => {
  try {
    const { profilePictureId } = await User.findById(req.user).select(
      "profilePictureId"
    );

    await cloudinary.uploader.destroy(profilePictureId);

    await User.findByIdAndUpdate(req.user, {
      profilePicture: "",
      profilePictureId: "",
    });

    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
};

/////////////////////////////////////////////////////
// Search for users using regex
exports.searchUsers = (req, res) => {
  const { username } = req.query;

  User.find({ username: { $regex: username, $options: "i" } })
    .select("-hashedPassword -profilePictureId")
    .exec((err, foundUsers) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
      }

      res.send(foundUsers);
    });
};

/////////////////////////////////////////////////////
// Follow user
exports.followUser = async (req, res) => {
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
          follower: mongoose.Types.ObjectId(followerId),
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

    res.sendStatus(500);
  }
};
/////////////////////////////////////////////////////
// Unfollow user
exports.unfollowUser = async (req, res) => {
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

    res.sendStatus(500);
  }
};
