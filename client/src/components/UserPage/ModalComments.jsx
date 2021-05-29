import React from 'react';
import UserIcon from "../Icons/UserIcon";

const ModalComments = ({post, comments }) => {
    return (
        <>
        <div className="my-2">
            {post.user.profilePicture ? (
                <img className="w-8 mr-2 rounded-full inline" src={post.user.profilePicture} alt={post.user.username} />
            ): (
                <UserIcon className="w-8 mr-2 inline text-gray-400" />
            )}
            <a href={`/user/${post.username}`} className="text-white text-sm">{post.username}</a>
        </div>
        <div className="bg-gray-800 flex-grow px-2 py-2">
            <ul className=" text-white">
                {comments.length ? comments.map(comment => {
                    return (
                        <li className=""><a href={`/${comment.user.username}`} className="font-semibold">{comment.user.username}</a> {comment.content}</li>
                    )
                }): (
                    <li className="text-gray-400"> <p>No comments yet...</p></li>
                )}
            </ul>
        </div>
        </>
    )
}

export default ModalComments;
