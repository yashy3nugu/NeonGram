import React, { useState } from "react";
import Header from "../header/header";
import DropZone from "./DropZone";
import PlusIcon from "../icons/PlusIcon";
import UploadIcon from "../icons/UploadIcon";
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
            <div className="postArea container mx-auto max-w-4xl w-full bg-gray-900 my-40">
                <form className="px-10 py-10" onSubmit={submitPost}>

                    <div className="grid grid-cols-2 gap-2">

                        <div className="col-span-2 text-center mt-6 mb-8 px-4">
                            <h1 className="text-white text-3xl font-bold">Create Post</h1>
                        </div>

                        <div className="mx-auto">

                            <DropZone setImage={handleImage} image={image} />

                        </div>

                        <div>
                            <div className="row-span-1 bg-gray-800 rounded border-b border-neon-purple py-2">
                                <input
                                    type="text"
                                    placeholder="Specify what the picture is about"
                                    name="caption"
                                    className="rounded text-white bg-gray-800 px-2 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:border-transparent w-full "
                                    value={caption}
                                    onChange={handleCaption}
                                />

                            </div>
                        </div>

                        <div className="col-span-2 text-right mt-6 px-4">
                            <button type="submit" className="postButton text-neon-green text-sm border-2 border-neon-green text-md px-2 py-2 rounded-full hover:bg-neon-green hover:text-black transition duration-200 ease-out"><UploadIcon /></button>
                            
                        </div>
                        
                    </div>
                    
                </form>
            </div>
        </>
    )
}

export default CreatePost;