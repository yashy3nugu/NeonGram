import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useClickOutsideListener from "../../hooks/useClickOutsideListener";
import CrossIcon from '../Icons/CrossIcon';
import ModalActions from "./ModalActions";
import ModalComments from "./ModalComments";
import axiosInstance from "../../config/axios";

export default function PostModal({ post, onClose, onDelete }) {

    const [comments, setComments] = useState([]);

    const ref = useClickOutsideListener(onClose);

    useEffect(() => {

        document.body.style.overflow = 'hidden';

        axiosInstance.get(`/api/comment/${post._id}`).then(res => setComments(res.data));

    }, [post._id])

    const addComment = (values, auth) => {
        console.log(values)
        setComments(prev => [...prev, { content: values.comment, user: { username: auth.username, profilePicture: auth.profilePicture } }]);
    }

    return createPortal(
        <div className="post-modal z-10 fixed top-0 left-0 right-0 bottom-0">

            <div ref={ref} className="post-modal__post bg-gray-900 flex flex-col w-full h-full overflow-y-scroll sm:flex-row lg:w-4/5 sm:h-4/6 lg:h-5/6 pb-0">
                <div className="relative sm:w-10/12 md:w-9/12 lg:w-8/12 bg-black">
                    <img src={post.postImage} alt={post.text} className="mx-auto w-full sm:max-h-full sm:max-w-full sm:w-auto sm:h-auto sm:absolute sm:top-0 sm:bottom-0 sm:left-0 sm:right-0 sm:m-auto" />
                    <button className="text-neon-red w-7 absolute right-1 top-1 sm:hidden" onClick={onClose}><CrossIcon /></button>
                </div>
                
                <div className="px-3 py-2 flex flex-col border-neon-purple sm:flex-grow">
                    <ModalActions post={post} addComment={addComment} onDelete={onDelete}/>
                    <ModalComments post={post} comments={comments}/>
                    
                </div>
            </div>



        </div>
        , document.getElementById('modal'))
}
