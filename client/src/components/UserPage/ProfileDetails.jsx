import React, { useContext, useState } from "react";
import UserIcon from "../Icons/UserIcon";
import PencilIcon from "../Icons/PencilIcon";
import UnfollowModal from "../Modals/UnfollowModal";
import axios from 'axios';
import { AuthContext } from "../contextProviders/authContext";
import { useHistory } from "react-router-dom";
import SettingsIconSolid from "../Icons/SettingsIconSolid";

const ProfileDetails = ({ userDetails, posts, addFollower, removeFollower }) => {

    const history = useHistory();

    const { auth } = useContext(AuthContext);

    const [unfollowModal, setunfollowModal] = useState(false);

    const followUser = () => {
        axios.patch(`/api/follow/${userDetails._id}`, {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(() => {
            addFollower(auth._id);
        })


    }

    const unfollowUser = () => {
        axios.patch(`/api/unfollow/${userDetails._id}`, {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(() => {
            setunfollowModal(false);
            removeFollower(auth._id)
        })
    }

    let action;

    if (userDetails.username === auth.username) {
        action = null
    } else if (userDetails.followers.includes(auth._id)) {
        action = <button onClick={() => setunfollowModal(true)} className="w-2/3 sm:w-1/3 bg-gray-900 border border-gray-300 px-3 py-2 mt-6 text-sm text-gray-300 rounded-lg">Following</button>
    } else {
        action = <button onClick={followUser} className="w-2/3 sm:w-1/3 bg-neon-purple border border-transparent px-3 py-2 mt-6 text-sm text-white rounded-lg hover:bg-purple-900 transition duration-150 ease-in-out">Follow</button>
    }

    return (
        <div className="container mx-auto mt-5 sm:mt-20">



            <div className="grid grid-cols-1">


                <div className="w-full text-center">
                    <div className="inline-block relative p-3">
                        {userDetails.username === auth.username && (
                            <button onClick={() => history.push("/settings")} className="absolute bottom-0 right-0"><SettingsIconSolid className="w-8 text-gray-400"/></button>
                        )}
                        
                        {userDetails.profilePicture ? (
                            <img src={userDetails.profilePicture} alt={userDetails.username} className="w-24 sm:w-28 md:w-32 rounded-full" />
                        ) : (
                            <UserIcon className="w-24 sm:w-28 md:w-32" />
                        )}
                    </div>

                </div>



                <div className=" text-center">

                    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl my-1 sm:my-2">{userDetails.username}</h1>
                    {userDetails.bio && <p className="text-gray-400">{userDetails.bio}</p>}

                    <div className="grid grid-cols-3 w-2/3 md:w-1/2 lg:1/3 mx-auto my-3 sm:my-3 text-sm md:text-base">
                        <span className="text-gray-300"><strong>{posts.length}</strong> posts</span>
                        <span className="text-gray-300"><strong>{userDetails.followers.length}</strong> followers</span>
                        <span className="text-gray-300"><strong>{userDetails.following.length}</strong> following</span>

                    </div>

                    {/* {userDetails.username === auth.username ? (
                        <button className=" bg-neon-purple px-3 py-2 text-sm rounded-full text-white my-2 hover:bg-purple-900 transition duration-150 ease-in-out" onClick={() => history.push("/settings")}>Edit Profile<PencilIcon className="h-5 ml-1 inline relative bottom-0.5" /></button>
                    ) : <button onClick={followUser} className="w-2/3 sm:w-1/3 bg-neon-purple px-3 py-2 mt-6 text-sm text-white rounded-lg hover:bg-purple-900 transition duration-150 ease-in-out">Follow</button>} */}
                    {action}


                </div>




            </div>

            {unfollowModal && <UnfollowModal user={userDetails} onClose={() => setunfollowModal(false)} unfollowUser={unfollowUser} />}


        </div>
    )


}

export default ProfileDetails;