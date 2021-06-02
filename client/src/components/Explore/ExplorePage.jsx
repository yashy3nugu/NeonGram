import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../config/axios';
import { Waypoint } from 'react-waypoint';
import ExplorePost from "./ExplorePost";
import SpinnerIcon from "../Icons/SpinnerIcon";
import PostModal from "../Modals/PostModal";

const ExplorePage = () => {

    const [explorePosts, setExplorePosts] = useState([]);
    const [hasNext, setHasNext] = useState(true);
    const [loading, setLoading] = useState(false);
    const [clickedPost, setClickedPost] = useState(null);

    useEffect(() => {
        axiosInstance.get("/api/posts/").then(res => {
            setExplorePosts(res.data);
        })
    }, []);


    const handlePagination = () => {

        if (!hasNext) {

            return;
        }

        const lastTime = explorePosts[explorePosts.length - 1].time;

        setLoading(true);

        axios.get("/api/posts", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            params: {
                lastTime
            }
        }).then(res => {
            if (res.data.length) {
                setExplorePosts(prev => [...prev, ...res.data]);
                setLoading(false);
            } else {
                setLoading(false)
                setHasNext(false);
            }
        })
    }

    const onClose = () => {
        setClickedPost(null);
        document.body.style.overflow = 'unset';
    }

    const showPost = (post) => {
        setClickedPost(post);
    }

    const onDelete = (id) => {

        axiosInstance.delete(`/api/posts/${id}`).then(() => {
            
            
            
            setExplorePosts(prev => {
                const remainingPosts = prev.filter(post => {
                    return !(post._id === id)
                });
    
                return remainingPosts;
            });

            onClose();
            
        })

        
    }

    return (
        <div className="container px-2 mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-10">
                {/* <pre className="text-white">{JSON.stringify(explorePosts,null,2)}</pre> */}
                {explorePosts.map((post, idx) => (
                    <div key={idx}>
                        {idx === explorePosts.length - 1 && (
                            <Waypoint onEnter={handlePagination} scrollableAncestor={window} />
                        )}
                        <ExplorePost post={post} showPost={showPost} />
                    </div>

                ))}
                
            </div>
            <div>
                <SpinnerIcon styles="block mx-auto" enabled={loading} size="6rem" />
            </div>

            {clickedPost && <PostModal post={clickedPost} onClose={onClose} onDelete={onDelete}/>}
            
        </div>
    )
}

export default ExplorePage
