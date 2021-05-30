import React, { useRef, useState } from 'react';
import UploadModal from "./UploadModal";
import PencilIcon from "../Icons/PencilIcon";

const ProfilePicChanger = () => {

    const fileInput = useRef(null);

    const [imageURL, setImageURL] = useState(null);

    const [croppedImage, setCroppedImage] = useState(null);

    const [imageFile, setImageFile] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const handleFiles = (e) => {
        setImageURL(URL.createObjectURL(e.target.files[0]));
        setImageFile(e.target.files[0]);
        setShowModal(true)
    }


    return (
        <>
            <button onClick={() => fileInput.current.click()} className="block w-1/3 lg:w-full bg-neon-purple text-white py-2 rounded-lg my-2 mx-auto">Upload Picture</button>
            <button className="block w-1/3 lg:w-full bg-neon-red text-white py-2 rounded-lg my-2 mx-auto">Delete Picture</button>
            <input type="file" className="hidden" ref={fileInput} onChange={handleFiles}/>
            {showModal && <UploadModal imageURL={imageURL} imageFile={imageFile} onClose={() => setShowModal(false)}/>}
        </>
    )
}

export default ProfilePicChanger
