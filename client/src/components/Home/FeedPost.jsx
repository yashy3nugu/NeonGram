import React from "react";
import UserIcon from "../icons/UserIcon";

const FeedPost = ({ post }) => {

    return (
    <div className="mx-auto w-1/2 h-96 bg-gray-900 text-center my-20">
        <div className="text-left text-sm px-2 py-4">
        <h1 className="text-white"><UserIcon className="w-8 mx-3 inline"/>{post.user}</h1>
        </div>
        <img src={post.postImage} alt={post.text}/>
    </div>
    )
}

export default FeedPost;