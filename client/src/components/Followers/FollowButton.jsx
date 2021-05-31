import React from 'react';
import UserAddIconSolid from "../Icons/UserAddIconSolid";
import TickIcon from "../Icons/TickIcon";

const FollowButton = ({auth,user,followUser}) => {

    if(auth.username === user.username) return null;

    else if(auth.following.includes(user._id)) {
        return <button className="rounded-full text-white border-2 bg-gray-900 px-1 py-1 hover:bg-gray-700"><TickIcon className="w-7"/></button>
    } 
    
    return <button onClick={() => followUser(user._id)} className="bg-neon-purple px-3 py-3 rounded-full text-white hover:bg-purple-900 hover:text-gray-400 transition ease-in-out duration-200"><UserAddIconSolid className="w-6"/></button>
    


    
}

export default FollowButton
