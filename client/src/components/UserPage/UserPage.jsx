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

    const addFollower = (followerID) => {
        

        const followers = [...userDetails.followers];

        followers.push(followerID)

        setUserDetails(prev => {
            return {
                ...prev,
                followers: followers
            }
        })
    }

    const removeFollower = (followerId) => {

        const followers = [...userDetails.followers];

        let followerIndex;

        followers.forEach((follower,idx) => {
            if(follower === followerId) {
                followerIndex = idx;
            }
        });

        followers.splice(followerIndex,1);

        setUserDetails(prev => {
            return {
                ...prev,
                followers
            }
        })

    }


    return (
        <>
            {(userDetails && posts) ? (
                <>
                    <ProfileDetails userDetails={userDetails} addFollower={addFollower} removeFollower={removeFollower} posts={posts} />
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