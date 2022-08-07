const { Post } = require("../models/postModel");
const { User } = require("../models/userModel");
const { cloudinary } = require('../config/cloudinary');
const streamifier = require('streamifier');
const mongoose = require("mongoose");



exports.createPost = (req, res) => {

    User.findById(req.user._id, (err, foundUser) => {
        if(err) {
            res.sendStatus(500);
            
        }

        const upload_stream = cloudinary.uploader.upload_stream(
            {
                folder: `posts/${req.user._id}`,
                unique_filename: true
            },
            (err, result) => {
                if (err) {
                    res.sendStatus(500);
                    //
                }

                Post.create({ text: req.body.text, postImage: result.url, postImageId: result.public_id, user: mongoose.Types.ObjectId(foundUser._id), username:foundUser.username }, (err) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                                
                            } else {
                                res.sendStatus(201);
                                
                            }
                        })
            }
        )

        streamifier.createReadStream(req.file.buffer).pipe(upload_stream);

    })

}

exports.getAllPosts = (req, res) => {
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
            console.log(err)
            res.sendStatus(500);
            
        }
        
        res.send(foundPosts);
        


    })
}

exports.getAllPostsFromFollowing = async (req, res) => {
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
}

exports.likePost = async (req, res) => {
    const { postId } = req.params;


    User.findOne({ _id: req.user._id }, (err, foundUser) => {

        if (err) {
            res.sendStatus(500);
            
        }



        Post.updateOne({ _id: postId }, { $addToSet: { likes: mongoose.Types.ObjectId(foundUser._id) }, $pull: { dislikes: mongoose.Types.ObjectId(foundUser._id)} }, (err) => {
            if (err) {
                console.log(err)
                res.sendStatus(500);
                
            } else {
                res.sendStatus(200);
                
            }

        })




    })

}

exports.dislikePost = async (req, res) => {
    const { postId } = req.params;

    User.findOne({ _id: req.user._id }, (err, foundUser) => {

        if (err) {
            res.sendStatus(500);
            
        }

        Post.updateOne({ _id: postId }, { $addToSet: { dislikes: mongoose.Types.ObjectId(foundUser._id) }, $pull: { likes: mongoose.Types.ObjectId(foundUser._id)} }, (err) => {
            if (err) {
                console.log(err)
                res.sendStatus(500);
                
            } else {
                res.sendStatus(200);
                
            }

        })

    })
}

exports.removeReaction = (req, res) => {
    const {postId, reaction} = req.params;

    User.findOne({ _id: req.user._id }, (err, foundUser) => {

        if (err) {
            res.sendStatus(500);
        }



        Post.updateOne({ _id: postId }, { $pull: { [reaction] : mongoose.Types.ObjectId(foundUser._id)} }, (err) => {
            if (err) {
                console.log(err)
                res.sendStatus(500);
                
            } else {
                res.sendStatus(200);
                
            }

        })




    })
}

exports.getPostsFromUsername = (req,res) => {
    const { username } = req.params;

    User.findOne({username: username}, (err, foundUser) => {

        if(foundUser){

            Post.find({user:foundUser._id})
            .populate({path:'user',select: ['fname','lname','username','profilePicture']})
            .exec((err,foundPosts) => {
                if(err) {
                    res.sendStatus(500);
                    
                }

                res.send(foundPosts);
                


            })
            

        } else if(err) {

            res.sendStatus(500);
            

        } else {
            res.sendStatus(400);
            
        }
    })
}

exports.savePost = async (req,res,next) => {

    const {postId} = req.params;

    const user = await User.findById(req.user._id);


    
    if(user) {
        console.log(user);

        Post.findByIdAndUpdate(postId,{$addToSet: {saved: mongoose.Types.ObjectId(postId)}})
    }
    else {
        res.sendStatus(401);
        
    }

}

exports.deletePost = (req,res,next) => {
    const {postId} = req.params;

    Post.findById(postId, (err, foundPost) => {
        if (foundPost) {




            cloudinary.uploader.destroy(foundPost.postImageId, (err, result) => {

                if (err) {
                    res.sendStatus(500);
                }

                Post.findByIdAndDelete(postId, (err, deletedPost) => {
                    res.sendStatus(200);
                })

            })



        } else if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(401)
        }
    })
}