import React, { useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contextProviders/authContext";
import { Formik, Form, Field } from 'formik';
import NeonGramIcon from "../icons/NeonGramIcon";

const LoginForm = () => {

    

    const { toggleAuth } = useContext(AuthContext);


    return (
        <div className="absolute top-1/2 transform -translate-y-1/2 sm:relative sm:max-w-md mx-auto w-full bg-gray-900 overflow-hidden rounded-lg border-2 border-transparent sm:border-neon-purple">
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
                    axios.post("/api/login", {
                        username: values.username,
                        password: values.password
                    })
                        .then(res => {
                            localStorage.setItem("accessToken", res.data.accessToken);
                            localStorage.setItem("refreshToken", res.data.refreshToken);
                            toggleAuth(true);
                            window.location.reload();
                        })
                        .catch(err => {
                            if(err.response.status === 400){
                                alert("wrong password")
                            }
                        });
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting,isValid,dirty }) => (
                    <Form autoComplete="off" className="px-10 py-10">
                        <div className="text-center">
                            <NeonGramIcon className="text-2xl sm:text-4xl text-white font-medium" />
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
                        <div className="text-center mt-5">
                            <p className="text-gray-300 text-sm">Don't have an account? <a href="/signup" className="text-neon-purple">Sign Up</a></p>
                        </div>

                    </Form>
                )}

            </Formik>

        </div>
    )
}

export default LoginForm;