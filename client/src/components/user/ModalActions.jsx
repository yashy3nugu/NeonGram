import React, { useState, useContext } from 'react';
import ThumbDownIconFilled from "../icons/ThumbDownIconFilled";
import ThumbUpIconFilled from "../icons/ThumbUpIconFilled";
import ThumbDownIcon from "../icons/ThumbDownIcon";
import ThumbUpIcon from "../icons/ThumbUpIcon";
import BookMarkIcon from "../icons/BookMarkIcon";
import PlusIcon from "../icons/PlusIcon";
import { AuthContext } from "../contextProviders/authContext";
import axios from "axios";
import { Formik, Form, Field } from 'formik';

const ModalActions = ({ post, addComment }) => {


    const { auth } = useContext(AuthContext);

    const [liked, setLiked] = useState(post.likes.includes(auth._id));
    const [disliked, setDisliked] = useState(post.dislikes.includes(auth._id));

    const [numLikes, setNumLikes] = useState(post.likes.length);
    const [numDislikes, setNumDislikes] = useState(post.dislikes.length);

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

    return (
        <>
            <div className="flex justify-between align-middle mt-2 mb-3">
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
            <Formik
                initialValues={{
                    comment: ""
                }}

                validate={values => {
                    const errors = {};
                    if (!values.comment) {
                        errors.comment = 'comment required';
                    }

                    return errors;
                }}

                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    axios.post(`api/comment/add/${post._id}`, {
                        content: values.comment
                    }, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                        }
                    });
                    // setComments(prev => [...prev, { content: values.comment, user: { username: auth.username } }]);
                    addComment(values, auth)
                    values.comment = ""
                    setSubmitting(false);
                }}

            >

                {({ isSubmitting, isValid, dirty }) => (
                    <Form autoComplete="off" className="flex">
                        <Field type="text" maxLength="600" name="comment" placeholder="Add a comment..." className="w-full bg-gray-800 rounded mr-2 px-2 text-xs text-gray-300 focus:outline-none" />
                        <button type="submit" disabled={isSubmitting || !(isValid && dirty)} className="w-8 text-neon-green disabled:opacity-50 disabled:cursor-not-allowed"><PlusIcon className="" /></button>
                    </Form>
                )}


            </Formik>
        </>
    )
}

export default ModalActions
