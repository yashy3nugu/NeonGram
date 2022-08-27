const { Post } = require("../models/postModel");
const { User } = require("../models/userModel");
const { cloudinary } = require("../config/cloudinary");
const streamifier = require("streamifier");
const mongoose = require("mongoose");

/////////////////////////////////////////////////////
// Create a post
exports.createPost = async (req, res) => {
  User.findById(req.user, (err, foundUser) => {
    if (err) {
      res.sendStatus(500);
    }

    const upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: `posts/${req.user}`,
        unique_filename: true,
      },
      (err, result) => {
        if (err) {
          res.sendStatus(500);
          //
        }

        Post.create(
          {
            text: req.body.text,
            postImage: result.url,
            postImageId: result.public_id,
            user: mongoose.Types.ObjectId(foundUser._id),
            username: foundUser.username,
          },
          (err) => {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            } else {
              res.sendStatus(201);
            }
          }
        );
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(upload_stream);
  });
};

/////////////////////////////////////////////////////
// Get all posts with pagination
exports.getAllPosts = async (req, res) => {
  try {
    const { lastTime } = req.query;

  let filter = {};

  if (lastTime) {
    filter = { time: { $lt: new Date(lastTime) } };
  }

  const posts = await Post.find(filter)
    .populate({
      path: "user",
      select: ["fname", "lname", "username", "profilePicture"],
    })
    .sort({ time: -1 })
    .limit(6)
    
    res.send(posts);
  }
  catch (err) {
    
    res.sendStatus(500);
  }

  
};

///////////////////////////////////////////////////////////////////////
// Get all posts from the user's following sorted by time and paginated
exports.getAllPostsFromFollowing = async (req, res) => {
  try {
    const { following } = await User.findById(req.user).select("following");
    const { lastTime } = req.query;

    let filter = { user: { $in: [...following, req.user] } };

    if (lastTime) {
      filter = {
        user: { $in: [...following, req.user] },
        time: { $lt: new Date(lastTime) },
      };
    }

    const posts = await Post.find(filter)
      .populate({
        path: "user",
        select: ["fname", "lname", "username", "profilePicture"],
      })
      .sort({ time: -1 })
      .limit(2);

    res.send(posts);
  } catch (err) {
    res.sendStatus(500);
  }
};

/////////////////////////////////////////////////////
// Like a post
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $addToSet: { likes: mongoose.Types.ObjectId(req.user) },
        $pull: { dislikes: mongoose.Types.ObjectId(req.user) },
      }
    );

    res.status(200).json({
      status: "success",
      updatedPost,
    });
  } catch (err) {
    res.sendStatus(500);
  }
};

/////////////////////////////////////////////////////
// Disklike a post
exports.dislikePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $addToSet: { dislikes: mongoose.Types.ObjectId(req.user) },
        $pull: { likes: mongoose.Types.ObjectId(req.user) },
      }
    );

    res.status(200).json({
      status: "success",
      updatedPost,
    });
  } catch (err) {
    res.sendStatus(500);
  }
};

/////////////////////////////////////////////////////
// Remove reaction from a post
exports.removeReaction = async (req, res) => {
  try {
    const { postId, reaction } = req.params;

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $pull: { [reaction]: mongoose.Types.ObjectId(req.user) } }
    );

    res.status(200).json({
      status: "success",
      updatedPost,
    });
  } catch (err) {
    res.sendStatus(500);
  }
};

/////////////////////////////////////////////////////
// Get all posts of a user from username
exports.getPostsFromUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const foundUser = await User.findOne({ username: username });

    if (foundUser) {
      const foundPosts = await Post.find({ user: foundUser._id })
        .populate({
          path: "user",
          select: ["fname", "lname", "username", "profilePicture"],
        })
        .sort({ time: -1 })
        .limit(2);

      res.send(foundPosts);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

/////////////////////////////////////////////////////
// Save post
exports.savePost = async (req, res, next) => {
  const { postId } = req.params;

  const user = await User.findById(req.user);

  if (user) {
    Post.findByIdAndUpdate(postId, {
      $addToSet: { saved: mongoose.Types.ObjectId(postId) },
    });
  } else {
    res.sendStatus(401);
  }
};

/////////////////////////////////////////////////////
// Delete Post
exports.deletePost = async (req, res) => {

  try {
    const { postId } = req.params;

    const foundPost = await Post.findById(postId);

    if (foundPost) {
      await cloudinary.uploader.destroy(foundPost.postImageId);

      await Post.findByIdAndDelete(postId);
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};
