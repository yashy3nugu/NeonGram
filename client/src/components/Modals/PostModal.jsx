import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CrossIcon from '../Icons/CrossIcon';
import ModalActions from "./ModalActions";
import ModalComments from "./ModalComments";
import axios from "axios";

export default function PostModal({ post, onClose }) {

    const [comments, setComments] = useState([]);


    useEffect(() => {

        document.body.style.overflow = 'hidden';

        axios.get(`/api/comment/${post._id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => setComments(res.data));

    }, [post._id])

    const addComment = (values, auth) => {
        setComments(prev => [...prev, { content: values.comment, user: { username: auth.username } }]);
    }

    return createPortal(
        <div className="post-modal z-10 fixed top-0 left-0 right-0 bottom-0">
            <button className="text-neon-red w-10 fixed right-1 top-1" onClick={onClose}><CrossIcon /></button>

            <div className="post-modal__post bg-gray-900 flex flex-col w-full h-full overflow-scroll">
                <div className="relative">
                    <img src={post.postImage} alt={post.text} className="mx-auto w-full" />
                    <button className="text-neon-red w-7 absolute right-1 top-1" onClick={onClose}><CrossIcon /></button>
                </div>
                
                <div className="px-3 py-2 flex flex-col border-neon-purple">
                    <ModalActions post={post} addComment={addComment}/>
                    <ModalComments post={post} comments={comments}/>
                    
                </div>
            </div>



        </div>
        , document.getElementById('modal'))
}
