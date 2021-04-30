import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {

    const [input, setInput] = useState({
        email: "",
        fname: "",
        lname: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleInput = (event) => {
        setInput(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    const signUp = (event) => {
        axios.post("/api/register",input);
        
        event.preventDefault();
    }

    return (
        <div className="loginForm container mx-auto w-full max-w-md bg-gray-900">
            <form className="px-10 py-10" onSubmit={signUp}>
                <div>
                    <h1 className="text-center logo">NeonGram</h1>
                </div>
                <div className="mb-3 mt-10 px-3">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleInput}
                        value={input.Email}
                        className="rounded text-white bg-gray-800 px-2 py-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"

                    />
                </div>

                <div className="flex flex-wrap mb-3 px-3">
                    <div className="w-full md:w-1/2 pr-0 pb-1.5 sm:pr-1 sm:pb-0">
                        <input
                            type="text"
                            placeholder="First Name"
                            name="fname"
                            onChange={handleInput}
                            value={input.fname}
                            className="rounded text-white block w-full bg-gray-800 px-2 py-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"

                        />
                    </div>
                    <div className="w-full md:w-1/2 pl-0 pt-1.5 sm:pl-1 sm:pt-0">
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lname"
                            onChange={handleInput}
                            value={input.lname}
                            className="rounded text-white block w-full bg-gray-800 px-2 py-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"

                        />
                    </div>
                </div>

                <div className="mb-3 px-3">
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleInput}
                        value={input.username}
                        className="rounded text-white bg-gray-800 px-2 py-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"

                    />
                </div>

                <div className="mb-3 px-3">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleInput}
                        value={input.password}
                        className="rounded text-white bg-gray-800 px-2 py-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"

                    />
                </div>

                <div className="mb-5 px-3">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={handleInput}
                        value={input.confirmPassword}
                        className="rounded text-white bg-gray-800 px-2 py-2 mb-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-purple-800 hover:bg-purple-900 transition duration-150 ease-in-out text-white rounded-full py-2 focus:outline-none"
                        >
                        Sign Up
                    </button>
                </div>

            </form>

        </div>
    )
}

export default SignUpForm;