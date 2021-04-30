const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        unique: true,
        required: [true,"email cannot be empty"]
    },
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    username: {
        type: String,
        unique: true,
        required: [true,"username cannot be empty"]
    },
    password: {
        type: String,
        minlength: 6,
        required: [true,"password is required"]
    },
    password: {
        type: String,
        required: [true,"password confirmation required"],
        validate: [function(pw) {
            return this.password === pw
        },"not matching passwords"]
    }
})