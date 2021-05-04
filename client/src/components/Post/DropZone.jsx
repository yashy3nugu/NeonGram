import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadIcon from "../icons/UploadIcon"
import axios from 'axios';

const DropZone = (props) => {

    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({

        accept: "image/*",
        onDrop: acceptedFiles => {
            props.setImage(
                acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            )
        }
    });

    return (
        <div>
            {props.image ? props.image.map(file => {
                return <div key={file.name} className="w-64">
                    <img src={file.preview} alt="preview"  />
                </div>
            }) :
                <div {...getRootProps()} className="dropzone h-64 border border-neon-purple bg-gray-800 container text-center w-64 py-14 hover:bg-gray-600 transition duration-300 ease-in-out">
                    <input {...getInputProps()} />
                    {/* <UploadIcon /> */}
                    <span className="text-gray-400">Drag and drop or click to upload</span>
                </div>}
        </div>
    )


}

export default DropZone;