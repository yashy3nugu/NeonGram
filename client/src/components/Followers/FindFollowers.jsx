import React, { useState, useContext } from 'react';
import axiosInstance from "../../config/axios";
import { Formik, Form, Field } from 'formik';
import {AuthContext} from "../contextProviders/authContext";
import FollowButton from "./FollowButton";
import SearchIcon from "../Icons/SearchIcon";
import UserIcon from "../Icons/UserIcon";
import UnfollowModal from "../Modals/UnfollowModal";
import ButtonSpinner from '../Icons/ButtonSpinner';

const FindFollowers = () => {

    const [searchResults, setSearchResults] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    const [followLoading, setFollowLoading] = useState(false);

    const [unfollowLoading, setUnfollowLoading] = useState(false);

    const { auth, toggleAuth } = useContext(AuthContext);

    const followUser = (followingId) => {
        setFollowLoading(true);
        axiosInstance.patch(`/api/follow/${followingId}`, {}).then(res => {
            // shallow copies are important for state updation
            setFollowLoading(false);
            let users = [...searchResults];
            
            let followedUserIndex;

            users.forEach((user,index) => {
                if(user._id === followingId) {
                    followedUserIndex = index;
                }
            });

            let followedUser;
            followedUser = {...users[followedUserIndex]};
            followedUser.followers.push(auth._id);
            users[followedUserIndex] = followedUser;

            setSearchResults(users);

            let currentAuth = {...auth};
            currentAuth.following.push(followingId);
            toggleAuth(currentAuth);

        })
    }

    const unfollowUser = (id) => {
        setUnfollowLoading(true);
        axiosInstance.patch(`/api/unfollow/${id}`,{}).then(res => {
            setSelectedUser(null);
            setUnfollowLoading(false);
            let users = [...searchResults];
            let unfollowedUser;
            let unfollowedUserIndex;

            users.forEach((user,index) => {
                if(user._id === id) {
                    unfollowedUserIndex = index;
                }
            });

            unfollowedUser = {...users[unfollowedUserIndex]};

            let index;

            unfollowedUser.followers.forEach((follower,idx) => {
                if(follower === id){
                    index = idx;
                }
            });

            unfollowedUser.followers.splice(index,1);

            users[unfollowedUserIndex] = unfollowedUser;

            setSearchResults(users);

            let currentAuth = {...auth};

            let authIndex;

            currentAuth.following.forEach((followingUser,idx) => {
                if(id === followingUser._id) {
                    authIndex = idx;
                }
            });

            currentAuth.following.splice(authIndex,1);

            toggleAuth(currentAuth)




        })
    }

    const selectUser = (user) => {
        setSelectedUser(user)
    }



    return (
        <div className="container bg-gray-900 h-screen mx-auto">
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
                    axiosInstance.get("/api/search", {
                        
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
                    <Form autoComplete="off" className="px-10 pt-10">
                        
                            <div className="mb-3 mt-10 px-3 flex justify-center">
                                <Field type="text" name="search" placeholder="search" className="rounded text-white bg-gray-800 px-2 py-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
                                <button type="submit" className="bg-neon-purple inline rounded px-2 py-2 text-white disabled:opacity-50 ml-2" disabled={isSubmitting}>{isSubmitting ? <ButtonSpinner className="w-5 animate-spin"/> : <SearchIcon className="w-5" />}</button>
                            </div>
                        


                        

                    </Form>
                )}

            </Formik>

            <div className="mt-6 sm:mt-10">
                            {searchResults.map(
                                (user, idx) => (
                                    <div key={idx} className="py-2 px-3 bg-gray-800 rounded-full flex justify-between items-center w-full sm:w-3/4 md:w-3/5 lg:w-1/2 mx-auto mb-2">
                                        <div className="rounded-lg flex items-center">
                                            {user.profilePicture ? (
                                                <img src={user.profilePicture} alt={user.username} className="w-10 sm:w-12 rounded-full" />
                                            ): (
                                                <UserIcon className="w-10 sm:w-12 text-gray-400"/>
                                            )}
                                            
                                            <div className="ml-4">
                                                <a href={`/user/${user.username}`} className="text-white text-lg sm:text-xl text-left">{user.username}</a>
                                                <p className="text-gray-300 text-xs sm:text-sm text-left">{user.followers.length} {user.followers.length === 1 ? "follower" : "followers"}</p>

                                            </div>
                                        
                                        </div>
                                        {/* {auth.username !== user.username && <button onClick={() => followUser(user._id)} className="bg-neon-purple px-3 py-3 rounded-full text-white hover:bg-purple-900 hover:text-gray-400 transition ease-in-out duration-200"><UserAddIconSolid className="w-6"/></button>}
                                        {auth.following.includes(user._id) && <span>following</span>} */}
                                        <FollowButton auth={auth} user={user} followUser={followUser} selectUser={selectUser} loading={followLoading}/>
                                        
                                        
                                        
                                    </div>

                                )
                            )}
                            {!searchResults.length && (
                                <div className="">
                                    <p className="text-center text-lg text-gray-200">No users found with that username...</p>
                                </div>
                                
                                )}
                        </div>

            {selectedUser && <UnfollowModal user={selectedUser} onClose={() => setSelectedUser(null)} unfollowUser={unfollowUser} loading={unfollowLoading}/>}

        </div>
    )
}

export default FindFollowers
