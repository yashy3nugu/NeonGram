import React, {useState} from "react";
import Header from "../header/header";

const CreatePost = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        console.log(e.target.files);

    }

    return (
        <>
            <Header />
            <input type="file" name="file" onChange={handleFileChange} />
        </>
    )
}

export default CreatePost;