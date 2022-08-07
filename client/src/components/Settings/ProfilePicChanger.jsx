import React, { useRef, useState } from "react";
import UploadModal from "../Modals/UploadModal";
import ButtonSpinner from "../icons/ButtonSpinner";
import PencilIcon from "../icons/PencilIcon";
import DeleteIcon from "../icons/DeleteIcon";
import axiosInstance from "../../config/axios";

const ProfilePicChanger = ({ userDetails }) => {
  const fileInput = useRef(null);

  const [imageURL, setImageURL] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFiles = (e) => {
    setImageURL(URL.createObjectURL(e.target.files[0]));
    setImageFile(e.target.files[0]);
    setShowModal(true);
  };

  const deleteProfilePicture = () => {
    setLoading(true);
    axiosInstance
      .delete("/api/deleteProfilePic")
      .then(() => window.location.reload());
  };

  return (
    <>
      <button
        onClick={() => fileInput.current.click()}
        className="block w-1/3 lg:w-full bg-neon-purple hover:bg-purple-900 transition ease-in-out text-white py-2 rounded-lg my-2 mx-auto"
      >
        <PencilIcon className="w-5 inline mr-1 mb-1" />
        {userDetails.profilePicture ? "Change" : "Upload"}
      </button>
      {userDetails.profilePicture && (
        <button
          onClick={deleteProfilePicture}
          className="block w-1/3 lg:w-full bg-neon-red hover:bg-red-700 transition ease-in-out text-white py-2 rounded-lg my-2 mx-auto"
        >
          {loading ? (
            <ButtonSpinner className="animate-spin mx-auto w-6" />
          ) : (
            <>
              <DeleteIcon className="w-5 inline mr-1 mb-1.5" />
              Delete
            </>
          )}
        </button>
      )}
      <input
        type="file"
        className="hidden"
        ref={fileInput}
        onChange={handleFiles}
      />
      {showModal && (
        <UploadModal
          imageURL={imageURL}
          imageFile={imageFile}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProfilePicChanger;
