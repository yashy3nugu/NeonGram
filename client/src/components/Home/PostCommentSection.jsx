import React from "react";
import { Formik, Form, Field } from 'formik';
import axios from "axios";
import PlusIcon from "../icons/PlusIcon";

const PostCommentSection = ({post}) => {

    return (
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
                axios.post(`api/comment/add/${post._id}`,{
                    content: values.comment
                },{
                    headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }});
                setSubmitting(false);
            }}

        >

            {({ isSubmitting, isValid, dirty }) => (
                <Form autoComplete="off" className="flex">
                    <Field type="text" name="comment" placeholder="Add a comment..." className="w-full bg-gray-800 rounded mr-2 px-2 text-xs text-gray-300" />
                    <button type="submit" disabled={isSubmitting || !(isValid && dirty)} className="w-8 text-neon-green disabled:opacity-50 disabled:cursor-not-allowed"><PlusIcon className=""/></button>
                </Form>
            )}

        </Formik>
    )
}

export default PostCommentSection;