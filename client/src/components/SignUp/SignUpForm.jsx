import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import NeonGramIcon from "../Icons/NeonGramIcon";

const SignUpForm = () => {


    return (
        <div className="loginForm container mx-auto w-full max-w-md bg-gray-900 border-2 border-transparent sm:border-neon-purple rounded-lg">
        <Formik
            initialValues={{
                email: "",
                fname: "",
                lname: "",
                username: "",
                password: "",
                confirmPassword: ""
            }}
            validate={values => {
                const errors = {}
                Object.keys(values).forEach(field => {
                    if(!values[field]){
                        errors[field] = 'required'
                    }
                })

                if(values.password !== values.confirmPassword){
                    errors.confirmPassword = 'Passwords not matching'
                }

                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
                console.log(values)
                axios.post("/api/register",values).catch(err => console.log(err));
                setSubmitting(false)
            }}
        >
            {({isSubmitting,isValid,dirty}) => (<Form autoComplete="off" className="px-10 py-10">
                <div className="text-center">
                    <NeonGramIcon className="text-2xl sm:text-4xl text-white font-medium"/>
                </div>
                <div className="mb-3 mt-10 px-3">
                    <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="rounded text-white bg-gray-800 px-2 py-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"
                    />
                </div>

                <div className="flex flex-wrap mb-3 px-3">
                    <div className="w-full md:w-1/2 pr-0 pb-1.5 sm:pr-1 sm:pb-0">
                        <Field
                            type="text"
                            placeholder="First Name"
                            name="fname"
                            className="rounded text-white block w-full bg-gray-800 px-2 py-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"

                        />
                    </div>
                    <div className="w-full md:w-1/2 pl-0 pt-1.5 sm:pl-1 sm:pt-0">
                        <Field
                            type="text"
                            placeholder="Last Name"
                            name="lname"
                            className="rounded text-white block w-full bg-gray-800 px-2 py-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"

                        />
                    </div>
                </div>
                <div className="mb-3 px-3">
                    <Field
                        type="text"
                        placeholder="Username"
                        name="username"
                        className="rounded text-white bg-gray-800 px-2 py-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"

                    />
                </div>

                <div className="mb-3 px-3">
                    <Field
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="rounded text-white bg-gray-800 px-2 py-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"

                    />
                </div>

                <div className="mb-5 px-3">
                    <Field
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        className="rounded text-white bg-gray-800 px-2 py-2 mb-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"
                    />
                    <ErrorMessage name="confirmPassword" component="p" className="text-sm italic text-red-600 mx-3"/>
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting || !(isValid && dirty)}
                        className="w-full bg-purple-800 hover:bg-purple-900 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out text-white rounded-full py-2 focus:outline-none"
                        >
                        Sign Up
                    </button>
                </div>
            </Form>)}
        </Formik>
            

        </div>
    )
}

export default SignUpForm;