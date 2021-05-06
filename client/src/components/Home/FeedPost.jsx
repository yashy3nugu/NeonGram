import React, { useState } from "react";
import axios from "axios";
import UserIcon from "../icons/UserIcon";
import ThumbDownIconFilled from "../icons/ThumbDownIconFilled";
import ThumbUpIconFilled from "../icons/ThumbUpIconFilled";
import ThumbDownIcon from "../icons/ThumbDownIcon";
import ThumbUpIcon from "../icons/ThumbUpIcon";

const FeedPost = ({ post }) => {


    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const handleLiked = (e) => {

        e.preventDefault();

        if (!liked) {
            axios.post(`api/posts/${post._id}/like`, {}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(res => setLiked(true));

        } else {
            setLiked(false);
        }

        if (disliked) {
            setDisliked(false);
        }
    }

    const handleDisliked = (e) => {
        e.preventDefault()


        if(!disliked){
            axios.post(`api/posts/${post._id}/dislike`, {}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(res => setDisliked(true));
        
        } else {
            setDisliked(false);
        }

        if (liked) {
            setLiked(false);
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
                <button onClick={handleLiked} className="mx-2 outline-none w-8 text-neon-blue">{liked ? <ThumbUpIconFilled className="thumbUp" /> : <ThumbUpIcon className="thumbUp" />}</button>
                <button onClick={handleDisliked} className="mx-2 outline-none w-8 text-neon-red">{disliked ? <ThumbDownIconFilled className="thumbDown" /> : <ThumbDownIcon className="thumbDown" />}</button>
            </div>
            <div>
                <p className="text-white text-left">{post.text}</p>
            </div>

        </div>
    )
}

export default FeedPost;