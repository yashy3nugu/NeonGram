import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contextProviders/authContext";
import { Formik, Form, Field, ErrorMessage } from 'formik';

const LoginForm = () => {

    const history = useHistory();

    const { toggleAuth } = useContext(AuthContext);


    return (
        <div className="loginForm container mx-auto w-full max-w-md bg-gray-900">
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                validate={values => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = 'username required'
                    }
                    if (!values.password) {
                        errors.password = 'password required'
                    }
                    return errors;
                }}
                validateOnMount = {false}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    console.log(values);
                    axios.post("/api/login", {
                        username: values.username,
                        password: values.password
                    })
                        .then(res => {
                            localStorage.setItem("accessToken", res.data.accessToken);
                            localStorage.setItem("refreshToken", res.data.refreshToken);
                            toggleAuth(true);
                            history.push("/");
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting,isValid,dirty }) => (
                    <Form className="px-10 py-10">
                        <div>
                            <h1 className="text-center logo">NeonGram</h1>
                        </div>
                        <div className="mb-3 mt-10 px-3">
                            <Field type="text" name="username" placeholder="username" className="rounded text-white bg-gray-800 px-2 py-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full" />
                            {/* <ErrorMessage name="username" component="p" className="text-red-600 text-xs italic mt-1 ml-1" /> */}
                        </div>
                        
                        <div className="mb-5 px-3">
                            <Field type="password" name="password" placeholder="password" className="rounded text-white bg-gray-800 px-2 py-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full" />
                            {/* <ErrorMessage name="password" component="p" className="text-red-600 text-xs italic mt-1 ml-1" /> */}
                        </div>
                        
                        <div>
                            <button type="submit" disabled={isSubmitting || !(isValid && dirty)} className="w-full bg-purple-800 hover:bg-purple-900 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out text-white rounded-full py-2 focus:outline-none">Sign In</button>
                        </div>

                    </Form>
                )}

            </Formik>

        </div>
    )
}

export default LoginForm;