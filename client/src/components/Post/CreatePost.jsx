import React, { useState } from "react";
import Header from "../header/header";
import DropZone from "./DropZone";
import axios from "axios";

const CreatePost = () => {

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");

    const handleImage = (image) => setImage(image);

    const handleCaption = e => setCaption(e.target.value);

    const submitPost = (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append('postImage',image[0]);
        fd.append('text',caption);
        axios.post("/api/posts/createPost",fd,{headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }})
    }

    return (
        <>
            <Header />
            <div className="container mx-auto w-full bg-gray-900">
                <form className="px-10 py-10" onSubmit={submitPost}>
                    <h1 className="text-white">Create Post</h1>

                    <div className="grid grid-cols-2 gap-2">
                        <div>

                            <DropZone setImage={handleImage} image={image} />

                        </div>

                        <div>
                            <div className="row-span-1 bg-gray-800 rounded border-b border-purple-700 py-2">
                                <input
                                    type="text"
                                    placeholder="Specify what the picture is about"
                                    name="caption"
                                    className="rounded text-white bg-gray-800 px-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:border-transparent w-full"
                                    value={caption}
                                    onChange={handleCaption}
                                />

                            </div>
                        </div>
                    </div>
                    <button type="submit" className="text-white">Post!</button>
                </form>
            </div>
        </>
    )
}

export default CreatePost;