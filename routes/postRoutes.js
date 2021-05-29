const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const mongoose = require("mongoose");
const { authenticateToken } = require("../utils/jwt");
const { Post } = require("../models/postModel");
const { User } = require("../models/userModel");
const streamifier = require('streamifier');
const { cloudinary } = require('../utils/cloudinary');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + req.user.name + '-' + file.originalname);
    }
})

const imageFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

//new Date().toISOString().replace(/:/g, '-') required because windows OS does not accept path with ':'

const upload = multer({
    limits: {
        fileSize: 1024 * 1024 * 100
    }
});
const router = express.Router();

// create a post
router.post("/createPost", authenticateToken, upload.single('postImage'), (req, res, next) => {


    User.findById(req.user._id, (err, foundUser) => {
        if(err) {
            res.sendStatus(500);
            next();
        }

        const upload_stream = cloudinary.uploader.upload_stream(
            {
                folder: `posts/${req.user._id}`,
                unique_filename: true
            },
            (err, result) => {
                if (err) {
                    res.sendStatus(500);
                    next();
                }

                Post.create({ text: req.body.text, postImage: result.url, postImageId: result.public_id, user: mongoose.Types.ObjectId(foundUser._id), username:foundUser.username }, (err) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                                next();
                            } else {
                                res.sendStatus(201);
                                next();
                            }
                        })
            }
        )

        streamifier.createReadStream(req.file.buffer).pipe(upload_stream);

    })


    // User.findOne({ _id: req.user._id }, (err, foundUser) => {
    //     if (err) {
    //         console.log(err);
    //         res.sendStatus(500);
    //         next();
    //     }

    //     if (foundUser) {
    //         Post.create({ text: req.body.text, postImage: req.file.path, user: mongoose.Types.ObjectId(foundUser._id), username:foundUser.username }, (err) => {
    //             if (err) {
    //                 console.log(err);
    //                 res.sendStatus(500);
    //                 next();
    //             } else {
    //                 res.sendStatus(201);
    //                 next();
    //             }
    //         })
    //     }
    // })



});

// get all posts for a user's feed for infinite scroll pagination. Latests post are shown everytime.
router.get("/", authenticateToken, (req, res, next) => {

    const {lastTime} = req.query;

    let filter = {};


    if(lastTime){
        filter = {'time': {'$lt': new Date(lastTime)}}
    }


    Post.find(filter)
    .populate({path:'user',select: ['fname','lname','username','profilePicture']})
    .sort({time: -1})
    .limit(6)
    .exec((err,foundPosts) => {
        if(err) {
            res.sendStatus(500);
            next();
        }

        res.send(foundPosts);
        next();


    })
})

router.get("/fromFollowing", authenticateToken, async (req,res, next) => {
    const {following} = await User.findById(req.user._id).select('following');
    const {lastTime} = req.query;


    let filter = {user: {$in: [...following,req.user._id]}}

    if(lastTime) {
        filter = {user: {$in: [...following,req.user._id]}, time: { $lt: new Date(lastTime)}}
    }


    const posts = await Post.find(filter)
    .populate({path:'user',select: ['fname','lname','username','profilePicture']})
    .sort({time: -1})
    .limit(2);

    res.send(posts);
    next();
})

// Add a like to a post
router.post("/:postId/like", authenticateToken, (req, res, next) => {
    const { postId } = req.params;


    User.findOne({ _id: req.user._id }, (err, foundUser) => {

        if (err) {
            res.sendStatus(500);
            next();
        }



        Post.updateOne({ _id: postId }, { $addToSet: { likes: mongoose.Types.ObjectId(foundUser._id) }, $pull: { dislikes: mongoose.Types.ObjectId(foundUser._id)} }, (err) => {
            if (err) {
                console.log(err)
                res.sendStatus(500);
                next();
            } else {
                res.sendStatus(200);
                next();
            }

        })




    })


});

// Add a dislike to a post
router.post("/:postId/dislike", authenticateToken, (req, res, next) => {
    const { postId } = req.params;


    User.findOne({ _id: req.user._id }, (err, foundUser) => {

        if (err) {
            res.sendStatus(500);
            next();
        }



        Post.updateOne({ _id: postId }, { $addToSet: { dislikes: mongoose.Types.ObjectId(foundUser._id) }, $pull: { likes: mongoose.Types.ObjectId(foundUser._id)} }, (err) => {
            if (err) {
                console.log(err)
                res.sendStatus(500);
                next();
            } else {
                res.sendStatus(200);
                next();
            }

        })




    })


});

// Remove a reaction to a post
router.post("/:postId/removeReaction/:reaction", authenticateToken, (req,res,next) => {
    const {postId, reaction} = req.params;

    User.findOne({ _id: req.user._id }, (err, foundUser) => {

        if (err) {
            res.sendStatus(500);
        }



        Post.updateOne({ _id: postId }, { $pull: { [reaction] : mongoose.Types.ObjectId(foundUser._id)} }, (err) => {
            if (err) {
                console.log(err)
                res.sendStatus(500);
                next();
            } else {
                res.sendStatus(200);
                next();
            }

        })




    })
})

// get posts of a username
router.get("/user/:username", authenticateToken, (req,res,next) => {
    const { username } = req.params;

    User.findOne({username: username}, (err, foundUser) => {

        if(foundUser){

            Post.find({username})
            .populate({path:'user',select: ['fname','lname','username','profilePicture']})
            .exec((err,foundPosts) => {
                if(err) {
                    res.sendStatus(500);
                    next();
                }

                res.send(foundPosts);
                next();


            })
            

        } else if(err) {

            res.sendStatus(500);
            next();

        } else {
            res.sendStatus(400);
            next();
        }
    })
})

router.patch("/save/:postId",authenticateToken, async (req,res,next) => {

    const {postId} = req.params;

    const user = await User.findById(req.user._id);


    
    if(user) {
        console.log(user);

        Post.findByIdAndUpdate(postId,{$addToSet: {saved: mongoose.Types.ObjectId(postId)}})
    }
    else {
        res.sendStatus(401);
        next();
    }

})


module.exports = router;