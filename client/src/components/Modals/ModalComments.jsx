import React from 'react';
import UserIcon from "../Icons/UserIcon";

const ModalComments = ({post, comments }) => {
    return (
        <>
        {/* <div className="my-2">
            {post.user.profilePicture ? (
                <img className="w-8 mr-2 rounded-full inline" src={post.user.profilePicture} alt={post.user.username} />
            ): (
                <UserIcon className="w-8 mr-2 inline text-gray-400" />
            )}
            <a href={`/user/${post.username}`} className="text-gray-200 text-base font-normal">{post.username}</a>
        </div> */}
        <div className="bg-gray-800 px-2 py-2 h-40 sm:flex-grow sm:mb-2 overflow-scroll rounded-lg">
            <ul className=" text-white">
                {comments.length ? comments.map((comment,idx) => {
                    return (
                            <li className="py-1.5 flex items-center" key={idx}>
                                {comment.user.profilePicture ? <img className="w-6 rounded-full mr-1.5" src={comment.user.profilePicture} alt={comment.user.username} />: <UserIcon className="w-8 mr-2 inline text-gray-400" />}
                                <span className="relative bottom-1">
                                    <a href={`/${comment.user.username}`} className="font-semibold">
                                        {comment.user.username}
                                    </a> {comment.content}
                                </span>
                                
                            </li>
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
