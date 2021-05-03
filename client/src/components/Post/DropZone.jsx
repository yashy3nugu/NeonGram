import React, { useState } from "react";
import {useDropzone} from "react-dropzone";
import axios from 'axios';

const DropZone = (props) => {

    const [files, setFiles] = useState([]);

    const {getRootProps, getInputProps} = useDropzone({

        accept: "image/*",
        // onDrop: (acceptedFiles) => {
        //     setFiles(
        //         acceptedFiles.map(file  => Object.assign(file, {
        //             preview: URL.createObjectURL(file)
        //         }))
        //     )
        // }
        onDrop: acceptedFiles => {
            props.setImage(
                acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            )
        }
    });
    
    return (
        <>
        <div {...getRootProps()} className="border border-purple-700 container text-center w-full">
            <input {...getInputProps()}/>
            <p>drop</p>
        </div>
        {props.image && props.image.map(file => {
            return <div key={file.name}>
                <img src={file.preview} alt="preview" style={{width: '30px'}}/>
            </div>
        })}
        </>
    )


}

export default DropZone;