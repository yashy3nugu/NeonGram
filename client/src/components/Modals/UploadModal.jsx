import React, { useState } from 'react';
import CrossIcon from "../Icons/CrossIcon";
import Cropper from "react-cropper";
import { createPortal } from 'react-dom';
import useClickOutsideListener from "../../hooks/useClickOutsideListener";
import axios from "axios";
import ButtonSpinner from "../Icons/ButtonSpinner"
import "cropperjs/dist/cropper.css";

const UploadModal = ({ onClose, imageURL, imageFile }) => {

    // const [imageURL, setImageURL] = useState(null);

    const [croppedImage, setCroppedImage] = useState(null);

    const [loading, setLoading] = useState(false)

    const ref = useClickOutsideListener(onClose);

    const saveProfilePicture = (e) => {
        setLoading(true);
        if (croppedImage) {
            const fd = new FormData();
            const imageSettings = JSON.stringify(croppedImage.getData({ rounded: true }))
            fd.append('profilePicture', imageFile);
            fd.append('imageSettings', imageSettings);
            axios.post("/api/addProfilePic", fd, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(res => window.location.reload())
        }
    }

    return createPortal(
        <div className="upload-modal z-10 fixed top-0 left-0 right-0 bottom-0">

            <div ref={ref} className="upload-modal__cropper bg-gray-900 w-5/6">
                <div className="py-2 px-1 text-center">
                    <h1 className="text-gray-300 text-xl">Upload</h1>
                </div>

                {imageURL && imageFile && (

                    <Cropper
                        src={imageURL}
                        style={{ height: 300, width: "100%" }}
                        background={false}
                        aspectRatio={1}
                        viewMode={1}
                        onInitialized={instance => setCroppedImage(instance)}
                        responsive={true}
                    >

                    </Cropper>





                )}
                <div className="text-right py-4 px-2">
                    <button onClick={saveProfilePicture} className="text-white bg-neon-purple rounded-lg py-2 w-1/5 hover:bg-purple-900 transition ease-in-out duration-200">
                        {loading ? <ButtonSpinner className="animate-spin w-6 mx-auto" /> : "Save"}
                    </button>

                </div>

            </div>
        </div>
        , document.getElementById('modal'))
}

export default UploadModal
