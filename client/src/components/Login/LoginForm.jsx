import React, {useState} from "react";
import axios from "axios";
import {useHistory}  from "react-router-dom";

const LoginForm = () => {

    const history = useHistory();

    const [input, setInput] = useState({
        username:"",
        password:""
    });

    const handleInput = (event) => {
        setInput(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    };
    
    const login = (event) => {

        axios.post("/api/login",input)
        .then(res => history.push("/home"))
        .catch(err => console.log(err));

        event.preventDefault();
    }

    return (
        <div className="loginForm container mx-auto w-full max-w-md bg-gray-900">
            <form className="px-10 py-10" onSubmit={login}>
                <div>
                <h1 className="text-center logo">NeonGram</h1>
                </div>
                <div className="mb-3 mt-10 px-3">
                    <input
                        type="text" 
                        placeholder="username" 
                        name="username"
                        onChange={handleInput}
                        value={input.username}
                        className="rounded text-white bg-gray-800 px-2 py-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"

                    />
                </div>

                <div className="mb-5 px-3">
                    <input 
                        type="password" 
                        placeholder="password"
                        name="password"
                        onChange={handleInput}
                        value={input.password}
                        className="rounded text-white bg-gray-800 px-2 py-2 mb-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"
                    />
                </div>
                <div>
                    <button type="submit" className="w-full bg-purple-800 hover:bg-purple-900 transition duration-150 ease-in-out text-white rounded-full py-2 focus:outline-none">Sign In</button>
                </div>

            </form>

        </div>
    )
}

export default LoginForm;