import React, { useEffect, useState, useContext } from "react";
import { Formik, Form, Field } from 'formik';
import { AuthContext } from "../contextProviders/authContext";
import axios from "axios";
import PlusIcon from "../Icons/PlusIcon";

const PostCommentSection = ({ post }) => {

    const { auth } = useContext(AuthContext);
    const [comments, setComments] = useState([]);

    useEffect(() => {

        axios.get(`api/comment/${post._id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => setComments(res.data));

    }, [post])

    return (
        <>
            {comments.length > 0 && (
                <ul className="max-h-32 text-gray-300 rounded bg-gray-800 px-3 py-2 mb-4 text-sm overflow-scroll">
                    {comments.map(comment => {
                        return (
                            <li className="my-0.5"><span className="font-semibold">{comment.user.username}</span> {comment.content}</li>
                        )
                    })}
                </ul>)}

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
                    setComments(prev => [...prev, { content: values.comment, user: { username: auth.username } }]);
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

export default PostCommentSection;