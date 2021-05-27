import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileDetails from "./ProfileDetails";
import PostGallery from "./PostGallery";

const UserPage = () => {

    const [posts,setPosts] = useState([]);
    const [userDetails, setUserDetails] = useState({});

    const { user } = useParams();

    useEffect(() => {

        axios.get(`/api/posts/user/${user}`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => setPosts(res.data));

        axios.get(`/api/details/${user}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => setUserDetails(res.data));


    }, [user])


    return (
        <>
        <ProfileDetails userDetails={userDetails}/>
        <PostGallery posts={posts} />
        </>
    )

}

export default UserPage;