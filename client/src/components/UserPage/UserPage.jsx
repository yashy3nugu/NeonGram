import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileDetails from "./ProfileDetails";
import SpinnerIcon from "../Icons/SpinnerIcon";
import PostGallery from "./PostGallery";

const UserPage = () => {

    const [posts, setPosts] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    const { user } = useParams();

    useEffect(() => {

        axios.get(`/api/posts/user/${user}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => setPosts(res.data));

        axios.get(`/api/details/${user}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => setUserDetails(res.data),1000);


    }, [user])


    return (
        <>
            {(userDetails && posts) ? (
                <>
                    <ProfileDetails userDetails={userDetails} posts={posts} />
                    <PostGallery posts={posts} />
                </>
            ): (
                <div>
                    <SpinnerIcon styles="block mx-auto" enabled={true} size="6rem" />
                </div>
            )}

        </>
    )

}

export default UserPage;