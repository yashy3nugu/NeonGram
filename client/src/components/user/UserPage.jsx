import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserPage = () => {

    const [posts,setPosts] = useState([]);

    const { user } = useParams();

    useEffect(() => {

        axios.get(`/api/posts/user/${user}`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => setPosts(res.data));


    }, [user])


    return <pre className="text-white">{JSON.stringify(posts,null,2)}</pre>

}

export default UserPage;