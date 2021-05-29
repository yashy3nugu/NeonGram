import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';

const FindFollowers = () => {

    const [searchResults, setSearchResults] = useState([]);

    const followUser = (followingId) => {
        axios.patch(`/api/follow/${followingId}`,{},{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
    }

    return (
        <div className="container bg-gray-900 mx-auto">
            <Formik
                initialValues={{
                    search: ""
                }}
                validate={values => {
                    const errors = {};
                    if (!values.search) {
                        errors.search = 'required'
                    }

                    return errors;
                }}
                validateOnMount={false}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    axios.get("/api/search", {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                        },
                        params: {
                            
                            username: values.search
                        }
                    })
                    .then(res => {
                        setSearchResults(res.data)
                        setSubmitting(false);
                        })
                    
                }}
            >
                {({ isSubmitting, isValid, dirty }) => (
                    <Form autoComplete="off" className="px-10 py-10">
                        <div className="mb-3 mt-10 px-3">
                            <Field type="text" name="search" placeholder="search" className="rounded text-white bg-gray-800 px-2 py-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
                            <button type="submit" className="bg-neon-purple inline rounded px-2 py-2 text-neon-green disabled:opacity-50" disabled={isSubmitting}>Search</button>
                        </div>

                        <div>
                            {searchResults.map(
                                (user,idx) => (
                                    <div key={idx} className="bg-gray-800">
                                        <img src={user.profilePicture} alt={user.username} className="w-8 rounded-full"/>
                                        <h1 className="text-white">{user.username}</h1>
                                        <button onClick={() => followUser(user._id)} className="bg-neon-green">Follow</button>
                                    </div>
                                )
                            )}
                        </div>

                    </Form>
                )}

            </Formik>

        </div>
    )
}

export default FindFollowers
