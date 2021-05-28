import React, {useContext} from "react";
import UserIcon from "../Icons/UserIcon";
import PencilIcon from "../Icons/PencilIcon";
import {AuthContext} from "../contextProviders/authContext";
import { useHistory } from "react-router-dom";

const ProfileDetails = ({userDetails}) => {

    const history = useHistory();

    const { auth } = useContext(AuthContext);

    return (
    <div className="w-full max-w-4xl mx-auto text-center">
    
        {userDetails && (
            <>
                <div className="my-5">
                    
                    <div className="w-44 rounded-full mx-auto overflow-hidden">
                        {userDetails.profilePicture ? (
                            <img src={userDetails.profilePicture} alt={userDetails.username} />
                            ) : (
                                <UserIcon className=""/>
                            ) }
                    </div>
                        
        

                    <div className="align-middle">
                        <h1 className="text-white text-2xl mt-8">{userDetails.username}</h1>
                        <h2 className="text-gray-200">{userDetails.fname} {userDetails.lname}</h2>
                        <h2 className="text-gray-200 text-sm">{userDetails.email}</h2>
                        {userDetails.username === auth.username && (
                            <button className=" bg-neon-purple px-3 py-2 text-sm rounded-full text-white my-2 hover:bg-purple-900 transition duration-150 ease-in-out" onClick={() => history.push("/settings")}>Edit Profile<PencilIcon className="h-5 ml-1 inline relative bottom-0.5"/></button>
                        )}
                    </div>
                    

                </div>
                <div></div>
            </> 
        )}
    </div>
    )

    
}

export default ProfileDetails;