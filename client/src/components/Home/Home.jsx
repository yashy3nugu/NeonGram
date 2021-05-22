import React, {useEffect, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../header/header";
import FeedPost from "./FeedPost";
import PlusIcon from "../icons/PlusIcon";
import {Waypoint} from "react-waypoint";


const Home = () => {

    const [posts,setPosts] = useState([]);
    const [hasNext, setHasNext] = useState(true);

    const history = useHistory();
    
    useEffect(() => {
        axios.get("/api/posts",{
            headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then(res => {
        if(res.data.length){
            setPosts(res.data);
        } else {
            setHasNext(false);
        }
        

    })
    .catch(err => {
        if(err.response.status === 400){
            history.push("/");
        }
    })
    },[history]);

    const handlePagination = () => {
        console.log("pagination req");
        if(!hasNext){
            return;
        }
        const lastId = posts[posts.length-1]._id;
        axios.get("/api/posts",{
            headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        params: {
            lastId
        }
    }).then(res => {
        console.log(res);
        if(res.data.length){
            setPosts(prev => [...prev,...res.data]);
        } else {
            console.log("no data")
            setHasNext(false)
        }
        

        
    })
    }
    

    return(
        <>
        <Header />
        {/* <pre className="text-white">{JSON.stringify(posts,null,2)}</pre> */}
        <div className="container mx-auto">
            
            {posts.map((post,idx) => (
                <div key={idx}>
                {idx === posts.length - 1 && (
                        <Waypoint onEnter={handlePagination} scrollableAncestor={window}/>
                        )
                }
                    <FeedPost post={post} />
                    <h1>{idx}</h1>
                    
                </div>
                
                    
                
            )
            )}
                {!hasNext && (
                    <div className="h-5 bg-gray-50">

                    </div>
                )}
            

        </div>
        </>
    )
}

export default Home;