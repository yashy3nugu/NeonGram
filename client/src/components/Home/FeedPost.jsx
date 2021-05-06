import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {AuthContext} from "../contextProviders/authContext"
import UserIcon from "../icons/UserIcon";
import ThumbDownIconFilled from "../icons/ThumbDownIconFilled";
import ThumbUpIconFilled from "../icons/ThumbUpIconFilled";
import ThumbDownIcon from "../icons/ThumbDownIcon";
import ThumbUpIcon from "../icons/ThumbUpIcon";
import { set } from "mongoose";

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
        <div className="post rounded-xl mx-auto w-1/2 bg-gray-900 my-20 px-3 border border-neon-purple">
            <div className="text-left text-sm px-2 py-4">
                <h1 className="text-white"><UserIcon className="w-8 mx-3 inline" />{post.username}</h1>
            </div>
            <div className="pb-2">
                <img src={post.postImage} alt={post.text} />
            </div>
            <div className="flex">
                <button onClick={handleLiked} className="mx-2 outline-none w-8 text-neon-blue">{liked ? <ThumbUpIconFilled className="thumbUp" /> : <ThumbUpIcon className="" />}</button>
                <span className="text-neon-blue">{numLikes}</span>
                <button onClick={handleDisliked} className="mx-2 outline-none w-8 text-neon-red">{disliked ? <ThumbDownIconFilled className="thumbDown" /> : <ThumbDownIcon className="" />}</button>
                <span className="text-neon-red">{numDislikes}</span>
            </div>
            <div>
                <p className="text-white text-left">{post.text}</p>
            </div>

        </div>
    )
}

export default FeedPost;