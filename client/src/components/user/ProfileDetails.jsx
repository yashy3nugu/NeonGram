import React, {useContext} from "react";
import UserIcon from "../icons/UserIcon";
import PencilIcon from "../icons/PencilIcon";
import {AuthContext} from "../contextProviders/authContext";

const ProfileDetails = ({userDetails}) => {

    const { auth } = useContext(AuthContext);

    return (
    <div className="w-full max-w-4xl mx-auto text-center">
    
        {userDetails && (
            <>
                <div className="my-5">
                    
                        <UserIcon className="w-32 text-gray-500 bg-black border-2 border-neon-purple rounded-full mx-auto"/>
        

                    <div className="align-middle">
                        <h1 className="text-white text-2xl mt-8">{userDetails.username}</h1>
                        <h2 className="text-gray-200">{userDetails.fname} {userDetails.lname}</h2>
                        <h2 className="text-gray-200 text-sm">{userDetails.email}</h2>
                        {userDetails.username === auth.username && (
                            <button className=" bg-neon-purple px-3 py-2 text-sm rounded-full text-white my-2 hover:bg-purple-900 transition duration-150 ease-in-out">Edit Profile<PencilIcon className="h-5 ml-1 inline relative bottom-0.5"/></button>
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