import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Waypoint } from 'react-waypoint';
import ExplorePost from "./ExplorePost";

const ExplorePage = () => {

    const [explorePosts, setExplorePosts] = useState([]);

    useEffect(() => {
        axios.get("/api/posts/",{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => {
            setExplorePosts(res.data);
        })
    },[]);

    const handlePagination = () => {
        const lastTime = explorePosts[explorePosts.length - 1].time;
        axios.get("/api/posts", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            params: {
                lastTime
            }
        }).then(res => {
            if(res.data.length) {
                setExplorePosts(prev => [...prev,...res.data]);
            }
        })
    }

    return (
        <div className="grid grid-cols-3 max-w-4xl gap-3 mx-auto">
            {/* <pre className="text-white">{JSON.stringify(explorePosts,null,2)}</pre> */}
            {explorePosts.map((post,idx) => (
                <div key={idx}>
                    {idx === explorePosts.length - 1 && (
                        <Waypoint onEnter={handlePagination} scrollableAncestor={window} />
                    )}
                    <ExplorePost post={post}/>
                </div>
                
            ))}
        </div>
    )
}

export default ExplorePage
