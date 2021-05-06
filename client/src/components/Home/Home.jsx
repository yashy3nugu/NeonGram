import React, {useEffect, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../header/header";
import FeedPost from "./FeedPost";


const Home = () => {

    const [posts,setPosts] = useState([]);

    const history = useHistory();
    
    useEffect(() => {
        axios.get("/api/posts/getAll",{
            headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then(res => {
        setPosts(res.data)
    })
    .catch(err => {
        if(err.response.status === 400){
            history.push("/");
        }
    })
    },[])
    

    return(
        <>
        <Header />
        <pre className="text-white">{JSON.stringify(posts,null,2)}</pre>
        <div className="container mx-auto">
            
            {posts.map(post => (
                <div>
                    <FeedPost post={post} />
                </div>
            )
            )}

        </div>
        </>
    )
}

export default Home;