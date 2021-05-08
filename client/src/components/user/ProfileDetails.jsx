import React from "react";
import UserIcon from "../icons/UserIcon";

const ProfileDetails = ({userDetails}) => {

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
                    </div>
                    

                </div>
                <div></div>
            </> 
        )}
    </div>
    )

    
}

export default ProfileDetails;