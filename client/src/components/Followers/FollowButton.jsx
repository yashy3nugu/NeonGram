import React from "react";
import UserAddIconSolid from "../icons/UserAddIconSolid";
import TickIcon from "../icons/TickIcon";
import ButtonSpinner from "../icons/ButtonSpinner";

const FollowButton = ({ auth, user, followUser, selectUser, loading }) => {
  if (auth.username === user.username) return null;
  else if (auth.following.includes(user._id)) {
    return (
      <button
        onClick={() => selectUser(user)}
        
      >
        <TickIcon  />
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        followUser(user._id);
        e.preventDefault();
      }}
      
    >
      {loading ? (
        <ButtonSpinner  />
      ) : (
        <UserAddIconSolid  />
      )}
    </button>
  );
};

export default FollowButton;
