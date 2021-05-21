import React, {useEffect, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../header/header";
import FeedPost from "./FeedPost";
import PlusIcon from "../icons/PlusIcon";


const Home = () => {

    const [posts,setPosts] = useState([]);

    const history = useHistory();
    
    useEffect(() => {
        axios.get("/api/posts",{
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
    },[history]);

    const handlePagination = () => {
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
        setPosts(prev => [...prev,...res.data])
    })
    }
    

    return(
        <>
        <Header />
        {/* <pre className="text-white">{JSON.stringify(posts,null,2)}</pre> */}
        <div className="container mx-auto">
            
            {posts.map(post => (
                <div>
                    <FeedPost post={post} />
                </div>
            )
            )}
            <div className="text-center">
                <button onClick={handlePagination} className="w-5 text-white"><PlusIcon /></button>
            </div>
            

        </div>
        </>
    )
}

export default Home;