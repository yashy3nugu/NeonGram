import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import {AuthContext} from "../contextProviders/authContext";
import FollowButton from "./FollowButton";
import SearchIcon from "../Icons/SearchIcon";
import UserIcon from "../Icons/UserIcon";
import UnfollowModal from "../Modals/UnfollowModal";

const FindFollowers = () => {

    const [searchResults, setSearchResults] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    const { auth } = useContext(AuthContext);

    const followUser = (followingId) => {
        axios.patch(`/api/follow/${followingId}`, {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
    }

    const selectUser = (user) => {
        setSelectedUser(user)
    }



    return (
        <div className="container bg-gray-900 h-screen mx-auto text-center">
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
                        
                            <div className="mb-3 mt-10 px-3 flex justify-center">
                                <Field type="text" name="search" placeholder="search" className="rounded text-white bg-gray-800 px-2 py-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
                                <button type="submit" className="bg-neon-purple inline rounded px-2 py-2 text-white disabled:opacity-50 ml-2" disabled={isSubmitting}><SearchIcon className="w-5" /></button>
                            </div>
                        


                        <div>
                            {searchResults.map(
                                (user, idx) => (
                                    <div key={idx} className="py-2 px-3 bg-gray-800 rounded-full flex justify-between items-center">
                                        <div className="rounded-lg flex items-center">
                                            {user.profilePicture ? (
                                                <img src={user.profilePicture} alt={user.username} className="w-12 rounded-full" />
                                            ): (
                                                <UserIcon className="w-12 text-gray-400"/>
                                            )}
                                            
                                            <div className="ml-4">
                                                <a href={`/user/${user.username}`} className="text-white text-xl">{user.username}</a>
                                                <p className="text-gray-300 text-sm">{user.followers.length} {user.followers.length === 1 ? "follower" : "followers"}</p>

                                            </div>
                                        
                                        </div>
                                        {/* {auth.username !== user.username && <button onClick={() => followUser(user._id)} className="bg-neon-purple px-3 py-3 rounded-full text-white hover:bg-purple-900 hover:text-gray-400 transition ease-in-out duration-200"><UserAddIconSolid className="w-6"/></button>}
                                        {auth.following.includes(user._id) && <span>following</span>} */}
                                        <FollowButton auth={auth} user={user} followUser={followUser} selectUser={selectUser}/>
                                        
                                        
                                        
                                    </div>

                                )
                            )}
                        </div>

                    </Form>
                )}

            </Formik>

            {selectedUser && <UnfollowModal user={selectedUser} onClose={() => setSelectedUser(null)}/>}

        </div>
    )
}

export default FindFollowers
