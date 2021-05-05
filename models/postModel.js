const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    
    text: {
        type: String,
        required: [true,"text cannot be empty"]
    },
    postImage: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId
    },
    username: {
        type: String,
        required: [true,"username cannot be empty"]
    },

    time: {
        type: Date,
        default: Date.now
    }

});



exports.Post = mongoose.model("Post", postSchema);