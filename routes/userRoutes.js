const express = require("express");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const multer = require("multer");
const sharp = require('sharp');
const streamifier = require('streamifier');
const { cloudinary } = require('../utils/cloudinary');
const { generateAccessToken, generateRefreshToken, authenticateToken } = require("../utils/jwt");

const router = express.Router();

const { User, RefreshToken } = require("../models/userModel");
const mongoose = require("mongoose");

router.post("/register", (req, res, next) => {




    const { email, fname, lname, username, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password);


    User.findOne({ $or: [{ username: username }, { email: email }] }, (err, foundUser) => {

        if (foundUser) {
            res.status(400).send("User exists");
        } else {

            User.create({ email, fname, lname, username, hashedPassword }, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(`User ${username} saved successfully`);
                    next();
                }
            })

        }
    })




});

router.post("/login", (req, res, next) => {

    const { username, password } = req.body;

    User.findOne({ username: username }, (err, foundUser) => {

        if (foundUser) {

            if (bcrypt.compareSync(password, foundUser.hashedPassword)) {

                const accessToken = generateAccessToken({ _id: foundUser._id });
                const refreshToken = generateRefreshToken({ _id: foundUser._id });

                RefreshToken.create({ token: refreshToken });


                res.send({
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
                next();

            }
            else {
                res.sendStatus(400);
            }
        }
        else if (err) {
            console.log(err);

            res.sendStatus(500);
            next();
        }

        else {
            res.status(400).send("Invalid username");
            next();
        }
    })



});

router.post("/token", (req, res, next) => {
    const refreshToken = req.body.refreshToken;

    if (refreshToken == null) {
        res.status(401).send("Refresh token required");
    }

    refreshTokenDoc.findOne({ token: refreshToken }, (err, foundToken) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal server error");
            next();
        }

        if (foundToken) {

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) {
                    console.log(err);
                    res.status(403).send("Invalid refresh token");
                    next();
                }

                const accessToken = generateAccessToken({ name: user.name });

                res.send(accessToken);
                next();
            })
        }
    })

});

router.post("/verify", authenticateToken, (req, res, next) => {


    User.findById(req.user._id)
        .select("username fname lname email bio profilePicture followers following")
        .exec((err, foundUser) => {
            if (err) {
                res.sendStatus(500);
                next();
            }

            res.send(foundUser);
            next();
        })

})

// get details of user from username
router.get("/details/:username", authenticateToken, (req, res, next) => {

    const { username } = req.params;


    User.findOne({ username: username })
        .select("username fname lname email bio profilePicture followers following")
        .exec((err, foundUser) => {
            if (foundUser) {

                res.send(foundUser);
                next();

            }
            else if (err) {
                res.sendStatus(500);
                next();
            }
            else {
                res.sendStatus(400);
                next();
            }
        })

});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + req.user.name + '-' + file.originalname);
    }
})

const upload = multer({
    limits: {
        fileSize: 1024 * 1024 * 100
    }
})

// router.post("/addProfilePic/:username", authenticateToken, upload.single('profilePicture'), (req,res,next) => {

// })

router.post("/addProfilePic", authenticateToken, upload.single('profilePicture'), (req, res, next) => {



    const { x, y, width, height } = JSON.parse(req.body.imageSettings);

    const filename = `uploads/${req.user._id}-profilePicture.jpg`;

    sharp(req.file.buffer)
        .extract({ left: x, top: y, width, height })
        .resize(1000, 1000)
        .toFormat('jpeg')
        .jpeg({
            quality: 100,
            force: true,
        })
        .toBuffer()
        .then(data => {

            //upload to cloudinary
            const upload_stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'profilePictures',
                    unique_filename: true
                }, (err, result) => {
                    if (err) {
                        res.sendStatus(500);
                        next();
                    }

                    //Find user
                    User.findById(req.user, (err, foundUser) => {

                        if (err) {
                            res.sendStatus(500);
                            next();
                        }

                        const publicId = foundUser.profilePictureId;
                        // Delete the previous profile picture
                        cloudinary.api.delete_resources([publicId], (err, response) => {
                            if (err) {
                                res.sendStatus(500);
                                next();
                            }
                            // add the new URL to database
                            User.updateOne({ _id: req.user }, { profilePicture: result.url, profilePictureId: result.public_id }, (err) => {
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


                }

            )

            streamifier.createReadStream(data).pipe(upload_stream);
        })
        .catch(err => console.log(err));

})

// add partial searching
router.get("/search", authenticateToken, (req, res, next) => {

    const { username } = req.query;
    console.log(req.query)

    console.log("called")

    User.find({ $text: { $search: username } })
        .select('-hashedPassword -profilePictureId')
        .exec((err, foundUsers) => {

            if (err) {
                res.sendStatus(500);
                console.log(err);
                next();
            }

            res.send(foundUsers);
            next();
        })

})

router.patch("/follow/:followingUserId", authenticateToken, async (req, res, next) => {
    const { followingUserId } = req.params;

    const followerId = req.user._id;

    User.findByIdAndUpdate(followerId, {
        $addToSet: {
            following: mongoose.Types.ObjectId(followingUserId)
        }
    }, (err) => {

        console.log("updated follower")
        if (err) {
            res.sendStatus(500);
            next();
        }
        User.findByIdAndUpdate(followingUserId, {
            $addToSet: {
                followers: mongoose.Types.ObjectId(followerId)
            }
        }, (err) => {
            if (err) {
                res.sendStatus(500);
                next();
            }

            console.log("updated follwing")

            res.sendStatus(200);
            next();
        })
    })

    // const session = await mongoose.startSession();

    // console.log("in")

    // try {

    //     session.startTransaction();

    //     const follower = await User.findByIdAndUpdate(followerId,{
    //         $addToSet: {
    //             following: mongoose.Types.ObjectId(followingUserId)
    //         }
    //     },{
    //         session
    //     });

    //     const followingUser = await User.findByIdAndUpdate(followingUserId, {
    //         $addToSet: {
    //             follower: mongoose.Types.ObjectId(followerId)
    //         }
    //     },
    //     {
    //         session
    //     });

    //     await session.commitTransaction();
    //     session.endSession();

    //     res.status(200).send({follower,followingUser})
    //     next();


    // }

    // catch (err) {
    //     console.log(err);
    //     await session.abortTransaction();
    //     session.endSession();

    //     res.sendStatus(500);
    //     next();

    // }



})

router.patch("/unfollow/:followingUserId", authenticateToken, async (req, res, next) => {
    const { followingUserId } = req.params;

    const followerId = req.user._id;

    User.findByIdAndUpdate(followerId, {
        $pull: {
            following: mongoose.Types.ObjectId(followingUserId)
        }
    }, (err) => {

        console.log("updated follower")
        if (err) {
            res.sendStatus(500);
            next();
        }
        User.findByIdAndUpdate(followingUserId, {
            $pull: {
                followers: mongoose.Types.ObjectId(followerId)
            }
        }, (err) => {
            if (err) {
                res.sendStatus(500);
                next();
            }

            console.log("updated follwing")

            res.sendStatus(200);
            next();
        })
    })

})

module.exports = router;