import React from 'react';
import UserIcon from "../icons/UserIcon";

const ModalComments = ({post, comments }) => {
    return (
        <>
        <div className="my-2">
                        <UserIcon className="w-8 mr-2 inline text-gray-400" /><a href={`/${post.username}`} className="text-white">{post.username}</a>
                    </div>
        <div className="bg-gray-800 flex-grow px-2 py-2">
            <ul className=" text-white">
                {comments.length && comments.map(comment => {
                    return (
                        <li className=""><span className="font-semibold">{comment.user.username}</span> {comment.content}</li>
                    )
                })}
            </ul>
        </div>
        </>
    )
}

export default ModalComments;
