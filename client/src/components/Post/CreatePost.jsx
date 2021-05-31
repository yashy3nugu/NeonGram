import React, { useState } from "react";
import DropZone from "./DropZone";
import UploadIcon from "../Icons/UploadIcon";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ButtonSpinner from "../Icons/ButtonSpinner";

const CreatePost = () => {

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleImage = (image) => setImage(image);

    const handleCaption = e => setCaption(e.target.value);

    const submitPost = (e) => {
        e.preventDefault();
        setLoading(true);

        const fd = new FormData();
        fd.append('postImage', image[0]);
        fd.append('text', caption);
        axios.post("/api/posts/createPost", fd, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(() => {
                setLoading(false)
                history.push('/')
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (

        <div className="postArea container mx-auto max-w-4xl w-full bg-gray-900 h-screen sm:h-auto my-40">
            <form className="px-10 py-10" onSubmit={submitPost}>



                <div className="col-span-2 text-center mt-6 mb-8 px-4">
                    <h1 className="text-gray-200 text-3xl font-bold">Upload</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="">

                        <DropZone setImage={handleImage} image={image} />

                    </div>


                    <div className="">
                        <textarea
                            type="text"
                            placeholder="Specify what the picture is about..."
                            name="caption"
                            className="rounded resize-y text-white bg-gray-800 px-2 py-3 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:border-b focus:border-neon-purple h-32 max-h-96 w-full"
                            value={caption}
                            onChange={handleCaption}
                            maxLength={100}
                        />

                    </div>

                </div>

                <div className="col-span-2 text-center sm:text-right mt-6 px-4">
                    <button type="submit" disabled={!(caption && image)} style={{ visibility: !(caption && image) ? 'hidden' : 'visible' }} className="w-12 bg-neon-green text-gray-100 rounded-full px-2 py-2">{loading ? <ButtonSpinner className="animate-spin" /> : <UploadIcon />}</button>
                </div>



            </form>
        </div>
    )
}

export default CreatePost;