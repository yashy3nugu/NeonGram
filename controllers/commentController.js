const { Comment } = require("../models/commentModel");

/////////////////////////////////////////////////////
// Add comment to a post
exports.addComment = async (req, res) => {
  try {
    const { postID } = req.params;
    const comment = await Comment.create({
      content: req.body.content,
      user: req.user,
      post: postID,
    });
    res.status(201).json(comment);
  } catch (err) {
    res.sendStatus(500);
  }
};

/////////////////////////////////////////////////////
// Get comments for a post
exports.getCommentsForPost = async (req, res) => {
  try {
    const { postID } = req.params;

    const comments = await Comment.find({ post: postID }).populate({
      path: "user",
      select: ["username", "profilePicture"],
    });

    res.send(comments);
  } catch (err) {
    res.sendStatus(500);
  }
};
