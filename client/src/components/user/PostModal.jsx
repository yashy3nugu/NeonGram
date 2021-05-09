import React, { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import CrossIcon from '../icons/CrossIcon';
import UserIcon from "../icons/UserIcon";
import ModalActions from "./ModalActions";
import ModalComments from "./ModalComments";
import { AuthContext } from "../contextProviders/authContext";
import axios from "axios";

export default function PostModal({ post, onClose }) {

    const [comments, setComments] = useState([]);


    useEffect(() => {

        axios.get(`api/comment/${post._id}`, {
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

            <div className="post-modal__post w-4/5 bg-gray-900 rounded-xl flex">
                <div className="w-2/3">
                    <img src={post.postImage} alt={post.text} className="" />
                </div>
                
                <div className="w-1/3 px-3 py-2 flex flex-col">
                    <ModalComments post={post} comments={comments}/>
                    <ModalActions post={post} addComment={addComment}/>
                </div>
            </div>



        </div>
        , document.getElementById('modal'))
}
