const { Comment } = require("../models/commentModel");

exports.addComment = (req, res) => {
  const { postID } = req.params;
  Comment.create(
    { content: req.body.content, post: postID, user: req.user._id },
    (err) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    }
  );
};

exports.getCommentsForPost = (req, res, next) => {
  const { postID } = req.params;

  Comment.find({ post: postID })
    .populate({ path: "user", select: ["username", "profilePicture"] })
    .then((comment) => {
      res.send(comment);
    });
};
