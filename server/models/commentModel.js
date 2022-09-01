const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    validate: [(val) => val.length < 600, "Comment exceeded 600 characters"],
  },

  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

exports.Comment = mongoose.model("Comment", commentSchema);
