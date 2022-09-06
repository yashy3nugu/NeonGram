import React, { useEffect, useState } from "react";
import UserIcon from "../icons/UserIcon";
import axios from "axios";

const ProfilePicIcon = ({ username, size }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/details/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => setUserDetails(res.data));
  }, [username]);

  return (
    <div>
      {userDetails && userDetails.profilePicture ? (
        <img src={userDetails.profilePicture} alt={username} />
      ) : (
        <UserIcon />
      )}
    </div>
  );
};

export default ProfilePicIcon;
