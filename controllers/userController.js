const sharp = require("sharp");
const streamifier = require("streamifier");
const { cloudinary } = require("../config/cloudinary");

exports.getUserFromUserName = (req, res) => {
  const { username } = req.params;

  User.findOne({ username: username })
    .select(
      "username fname lname email bio profilePicture profilePictureId followers following"
    )
    .exec((err, foundUser) => {
      if (foundUser) {
        res.send(foundUser);
      } else if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(400);
      }
    });
};

exports.updateUserDetails = async (req, res) => {
  const { userDetails } = req.body;
  try {
    await User.findByIdAndUpdate(req.user._id, userDetails);

    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
};

exports.uploadProfilePicture = (req, res, next) => {
  const { x, y, width, height } = JSON.parse(req.body.imageSettings);

  const filename = `uploads/${req.user._id}-profilePicture.jpg`;

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

exports.deleteProfilePicture = async (req, res, next) => {
  try {
    const { profilePictureId } = await User.findById(req.user._id).select(
      "profilePictureId"
    );

    await cloudinary.uploader.destroy(profilePictureId);

    await User.findByIdAndUpdate(req.user._id, {
      profilePicture: "",
      profilePictureId: "",
    });

    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
};

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

exports.followUser = async (req, res) => {
  const { followingUserId } = req.params;

  const followerId = req.user._id;

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

exports.unfollowUser = async (req, res) => {
  const { followingUserId } = req.params;

  const followerId = req.user._id;

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
