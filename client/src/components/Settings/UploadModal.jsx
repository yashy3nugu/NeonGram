import React, { useState } from 'react';
import CrossIcon from "../Icons/CrossIcon";
import Cropper from "react-cropper";
import { createPortal } from 'react-dom';
import axios from "axios";
import "cropperjs/dist/cropper.css";

const UploadModal = ({onClose}) => {

    const [imageURL, setImageURL] = useState(null);

    const [croppedImage, setCroppedImage] = useState(null);

    const [imageFile, setImageFile] = useState(null);

    

    const saveProfilePicture = (e) => {
        if(croppedImage) {
            const fd = new FormData();
            const imageSettings = JSON.stringify(croppedImage.getData({ rounded: true }))
            fd.append('profilePicture',imageFile);
            fd.append('imageSettings',imageSettings);
            axios.post("/api/addProfilePic", fd, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
        }
    }

    return createPortal(
        <div className="upload-modal z-10 fixed top-0 left-0 right-0 bottom-0">
            <button className="text-neon-red w-10 fixed right-1 top-1" onClick={onClose}><CrossIcon /></button>
            <div className="upload-modal__cropper">
                {imageURL ? (<Cropper
                src={imageURL}
                style={{ height: 600, width: "100%" }}
                background={false}
                aspectRatio={1}
                viewMode={1}
                onInitialized={instance => setCroppedImage(instance)}
                responsive={true}
                >
                
                </Cropper>): (
                    <input
                        type="file"
                        onChange = {(e) => {
                            setImageURL(URL.createObjectURL(e.target.files[0]));
                            setImageFile(e.target.files[0]);
                            }}
                     />
                )}
                <button onClick={saveProfilePicture} className="text-white">Save</button>
            </div>
        </div>
    ,document.getElementById('modal'))
}

export default UploadModal
