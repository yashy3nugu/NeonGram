import React from "react";
import { Formik, Form, Field } from 'formik';
import PlusIcon from "../icons/PlusIcon";

const PostCommentSection = () => {

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

        >

            {({ isSubmitting, isValid, dirty }) => (
                <Form autoComplete="off" className="flex">
                    <Field type="text" name="comment" placeholder="Add a comment..." className="w-full bg-gray-800 rounded mr-2 px-2 text-xs text-gray-300" />
                    <button disabled={isSubmitting || !(isValid && dirty)} className="w-8 text-neon-green disabled:opacity-50 disabled:cursor-not-allowed"><PlusIcon className=""/></button>
                </Form>
            )}

        </Formik>
    )
}

export default PostCommentSection;