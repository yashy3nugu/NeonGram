import React from "react";
import { useDropzone } from "react-dropzone";
import CrossIcon from "../Icons/CrossIcon"
import PlusIcon from "../Icons/PlusIcon";

const DropZone = (props) => {


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
        <div className="w-full">
            {props.image ? props.image.map(file => {
                return <div key={file.name} className="relative max-h-96 overflow-auto">
                    <img src={file.preview} alt="preview" className="w-full" />
                    <button className="absolute w-6 top-0 right-0 text-red-600 mr-1 mt-2" onClick={() => props.setImage(null)}>
                        <CrossIcon />
                    </button>
                    
                </div>
            }) :
                <div {...getRootProps()} className="dropzone flex flex-col items-center justify-center w-full h-96 border border-transparent hover:border-neon-purple bg-gray-800 container hover:bg-gray-600 transition duration-300 ease-in-out">
                    <input {...getInputProps()} />
                    <span className="text-gray-400 mb-3"><PlusIcon /></span>
                    <span className=" text-gray-400">Drag and drop or click to upload</span>
                </div>}
        </div>
    )


}

export default DropZone;