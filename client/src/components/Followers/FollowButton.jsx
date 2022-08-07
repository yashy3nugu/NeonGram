import React from 'react';
import UserAddIconSolid from "../icons/UserAddIconSolid";
import TickIcon from "../icons/TickIcon";
import ButtonSpinner from '../icons/ButtonSpinner';

const FollowButton = ({auth, user, followUser, selectUser, loading}) => {

    if(auth.username === user.username) return null;

    else if(auth.following.includes(user._id)) {
        return <button onClick={() => selectUser(user)} className="rounded-full text-white border-2 bg-gray-900 px-0.5 py-0.5 sm:px-1.5 sm:py-1.5 mr-0.5 hover:bg-gray-700"><TickIcon className="w-7"/></button>

    } 
    
    return <button onClick={(e) => {
        followUser(user._id);
        e.preventDefault()
        }} className="bg-neon-purple px-2 py-2 sm:px-3 sm:py-3 rounded-full text-white hover:bg-purple-900 hover:text-gray-400 transition ease-in-out duration-200">{loading ? <ButtonSpinner className="animate-spin w-6"/> : <UserAddIconSolid className="w-6"/>}</button>
    


    
}

export default FollowButton
