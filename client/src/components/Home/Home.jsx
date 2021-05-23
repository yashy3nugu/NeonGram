import React, {useEffect, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../header/header";
import FeedPost from "./FeedPost";
import {Waypoint} from "react-waypoint";
import SpinnerIcon from "../icons/SpinnerIcon";


const Home = () => {

    const [posts,setPosts] = useState([]);
    const [hasNext, setHasNext] = useState(true);
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    
    useEffect(() => {
        setLoading(true);
        axios.get("/api/posts",{
            headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then(res => {
        setLoading(false);
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
        setLoading(true);
        console.log("pagination req");
        if(!hasNext){
            setLoading(false);
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
        setLoading(false);
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
                    
                </div>
                
                    
                
            )
            )}
            <div>
            <SpinnerIcon styles="block mx-auto" enabled={loading} size="6rem" />
                
            </div>
            
            

        </div>
        </>
    )
}

export default Home;