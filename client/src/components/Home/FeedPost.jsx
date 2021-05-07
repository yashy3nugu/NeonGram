import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {AuthContext} from "../contextProviders/authContext";
import UserIcon from "../icons/UserIcon";
import ThumbDownIconFilled from "../icons/ThumbDownIconFilled";
import ThumbUpIconFilled from "../icons/ThumbUpIconFilled";
import ThumbDownIcon from "../icons/ThumbDownIcon";
import ThumbUpIcon from "../icons/ThumbUpIcon";
import CommentIcon from "../icons/CommentIcon";
import BookMarkIcon from "../icons/BookMarkIcon";
import DotsHorizontalIcon from "../icons/DotsHorizontalIcon";
import PostCommentSection from "./PostCommentSection"

const FeedPost = ({ post }) => {

    const { auth } = useContext(AuthContext);

    const [liked, setLiked] = useState(post.likes.includes(auth._id));
    const [disliked, setDisliked] = useState(post.dislikes.includes(auth._id));
    
    const [numLikes,setNumLikes] = useState(post.likes.length);
    const [numDislikes,setNumDislikes] = useState(post.dislikes.length);



    const handleLiked = (e) => {

        e.preventDefault();

        if (!liked) {

            setLiked(true);
            setNumLikes(prev => prev + 1);

            
            if (disliked) {
                setDisliked(false);
                setNumDislikes(prev => prev - 1);
            }

            axios.post(`api/posts/${post._id}/like`, {}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            .catch(err => {
                setLiked(false);
                setNumLikes(prev => prev - 1);

                setDisliked(true);
                setNumDislikes(prev => prev + 1);
                
            })

        } else {

            setLiked(false);
            setNumLikes(prev => prev - 1);

            axios.post(`api/posts/${post._id}/removeReaction/likes`,{},{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            .catch(err => {
                setLiked(true);
                setNumLikes(prev => prev + 1);
                return;
            })
            
        }

    }

    const handleDisliked = (e) => {
        e.preventDefault()


        if(!disliked){

            setDisliked(true);
            setNumDislikes(prev => prev + 1);

            if (liked) {
                setLiked(false);
                setNumLikes(prev => prev - 1);
            }

            axios.post(`api/posts/${post._id}/dislike`, {}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).catch(err => {
                
                setDisliked(false);
                setNumDislikes(prev => prev - 1);
                
                setLiked(true);
                setNumLikes(prev => prev + 1);

                return
            });
        
        } else {

            setDisliked(false);
            setNumDislikes(prev => prev - 1);
            axios.post(`api/posts/${post._id}/removeReaction/dislikes`,{},{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).catch(err => {

                setDisliked(true);
                setNumDislikes(prev => prev + 1);

                return
            })
        }

    }

    return (
        <div className="post rounded-xl mx-auto w-1/2 bg-gray-900 my-20 px-3 border-2 border-neon-purple">
            <div className="text-left text-sm px-0 py-4 flex justify-between">
                <div>
                    <UserIcon className="w-8 mr-2 inline text-gray-400" /><a href={`/${post.username}`} className="text-white">{post.username}</a>
                </div>
                <div>
                    <button className="w-6 inline text-right text-white relative py-1"><DotsHorizontalIcon/></button>
                </div>
                
            </div>
            <div className="mb-3">
                <p className="text-white text-left">{post.text}</p>
            </div>
            <div className="">
                <img src={post.postImage} alt={post.text} className="w-full"/>
            </div>
            <div className="flex justify-between align-middle mt-2 mb-3">
                <div className="flex">
                    <button onClick={handleLiked} className="mx-2 outline-none w-8 text-neon-blue">{liked ? <ThumbUpIconFilled className="thumbUp" /> : <ThumbUpIcon className="" />}</button>
                    <p className="text-neon-blue font-semibold mr-1 relative top-1.5">{numLikes}</p>
                
                    <button onClick={handleDisliked} className="mx-2 outline-none w-8 text-neon-red relative top-0.5">{disliked ? <ThumbDownIconFilled className="thumbDown" /> : <ThumbDownIcon className="" />}</button>
                    <span className="text-neon-red font-semibold mr-1 relative top-1.5">{numDislikes}</span>

                    <button className="mx-2 outline-none w-8 text-purple-600 relative"><CommentIcon className=""/></button>
                    <span className="text-neon-purple font-semibold relative top-1.5">3</span>
                </div>

                <div>
                <button className="text-white"><BookMarkIcon className="h-7 w-7 text-white"/></button>
                    
                </div>
                
                
            </div>

            <div className="mb-3">
                <PostCommentSection post={post} />
            </div>

        </div>
    )
}

export default FeedPost;