import React, { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import CrossIcon from '../icons/CrossIcon';
import UserIcon from "../icons/UserIcon";
import ThumbDownIconFilled from "../icons/ThumbDownIconFilled";
import ThumbUpIconFilled from "../icons/ThumbUpIconFilled";
import ThumbDownIcon from "../icons/ThumbDownIcon";
import ThumbUpIcon from "../icons/ThumbUpIcon";
import BookMarkIcon from "../icons/BookMarkIcon";
import ModalComments from "./ModalComments";
import { AuthContext } from "../contextProviders/authContext";
import axios from "axios";

export default function PostModal({ post, onClose }) {

    const [comments, setComments] = useState([]);

    const { auth } = useContext(AuthContext);

    const [liked, setLiked] = useState(post.likes.includes(auth._id));
    const [disliked, setDisliked] = useState(post.dislikes.includes(auth._id));

    const [numLikes, setNumLikes] = useState(post.likes.length);
    const [numDislikes, setNumDislikes] = useState(post.dislikes.length);

    useEffect(() => {

        axios.get(`api/comment/${post._id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => setComments(res.data));

    }, [post._id])

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

            axios.post(`api/posts/${post._id}/removeReaction/likes`, {}, {
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


        if (!disliked) {

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
            axios.post(`api/posts/${post._id}/removeReaction/dislikes`, {}, {
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


    return createPortal(
        <div className="post-modal z-10 fixed top-0 left-0 right-0 bottom-0">
            <button className="text-neon-red w-10 fixed right-1 top-1" onClick={onClose}><CrossIcon /></button>

            <div className="post-modal__post w-4/5 bg-gray-900 rounded-xl flex">
                <div className="w-2/3">
                    <img src={post.postImage} alt={post.text} className="" />
                </div>
                
                <div className="w-1/3 px-3 py-2 flex flex-col">
                    {/* <div className="my-2">
                        <UserIcon className="w-8 mr-2 inline text-gray-400" /><a href={`/${post.username}`} className="text-white">{post.username}</a>
                    </div> */}
                    {/* <div className="bg-gray-800 h-3/4 px-2 py-2">
                        <ul className=" text-white">
                            {comments.length && comments.map(comment => {
                                return (
                                    <li className=""><span className="font-semibold">{comment.user.username}</span> {comment.content}</li>
                                )
                            })}
                        </ul>
                    </div> */}
                    <ModalComments post={post} comments={comments}/>
                    <div className="flex h-1/4 justify-between align-middle mt-2 mb-3">
                        <div className="flex">
                            <button onClick={handleLiked} className="mx-2 outline-none w-8 text-neon-blue">{liked ? <ThumbUpIconFilled className="thumbUp" /> : <ThumbUpIcon className="" />}</button>
                            <p className="text-neon-blue font-semibold mr-1 relative top-1.5">{numLikes}</p>

                            <button onClick={handleDisliked} className="mx-2 outline-none w-8 text-neon-red relative top-0.5">{disliked ? <ThumbDownIconFilled className="thumbDown" /> : <ThumbDownIcon className="" />}</button>
                            <span className="text-neon-red font-semibold mr-1 relative top-1.5">{numDislikes}</span>


                        </div>

                        <div>
                            <button className="text-white"><BookMarkIcon className="h-7 w-7 text-white" /></button>

                        </div>


                    </div>
                </div>
            </div>



        </div>
        , document.getElementById('modal'))
}
