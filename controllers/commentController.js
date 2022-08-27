const { Comment } = require("../models/commentModel");

/////////////////////////////////////////////////////
// Add comment to a post
exports.addComment = (req, res) => {
  const { postID } = req.params;
  Comment.create(
    { content: req.body.content, post: postID, user: req.user },
    (err) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    }
  );
};

/////////////////////////////////////////////////////
// Get comments for a post
exports.getCommentsForPost = (req, res, next) => {
  const { postID } = req.params;

  Comment.find({ post: postID })
    .populate({ path: "user", select: ["username", "profilePicture"] })
    .then((comment) => {
      res.send(comment);
    });
};
