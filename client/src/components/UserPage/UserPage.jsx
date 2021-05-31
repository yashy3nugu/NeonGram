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

    const removePost = (id) => {
        const currentPosts = [...posts];
        let removeIndex;

        currentPosts.forEach((post,idx) => {
            if(id === post._id) {
                removeIndex = idx;
            }
        });

        currentPosts.splice(removeIndex,1);

        setPosts(currentPosts);
    }


    return (
        <>
            {(userDetails && posts) ? (
                <>
                    <ProfileDetails userDetails={userDetails} posts={posts} addFollower={addFollower} removeFollower={removeFollower} />
                    <PostGallery posts={posts} removePost={removePost}/>
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