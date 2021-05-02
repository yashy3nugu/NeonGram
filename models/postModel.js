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
    }

});



exports.Post = mongoose.model("Post", postSchema);