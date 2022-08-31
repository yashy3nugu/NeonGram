import React, { useRef, useState, useContext } from "react";
import UploadModal from "../Modals/UploadModal";
import ButtonSpinner from "../icons/ButtonSpinner";
import PencilIcon from "../icons/PencilIcon";
import DeleteIcon from "../icons/DeleteIcon";
import axiosInstance from "../../config/axios";
import { Box, Avatar, Button, chakra, VStack } from "@chakra-ui/react";
import ColoredFormButton from "../shared/ColoredFormButton";
import useModal from "../../hooks/useModal";
import { AuthContext } from "../contextProviders/authContext";

const ProfilePicChanger = () => {
  const fileInput = useRef(null);

  const [imageURL, setImageURL] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { auth } = useContext(AuthContext);

  const { isModalOpen, onModalClose, setModal } = useModal();

  const handleFiles = (e) => {
    setImageURL(URL.createObjectURL(e.target.files[0]));
    setImageFile(e.target.files[0]);
    setShowModal(true);
    setModal();
  };

  const deleteProfilePicture = () => {
    setLoading(true);
    axiosInstance
      .delete("/api/deleteProfilePic")
      .then(() => window.location.reload());
  };

  return (
    <>
      <Box>
        <VStack>
          <Avatar
            src={auth.profilePicture}
            alt={`${auth.username}'s profile`}
            size="2xl"
          />
          <ColoredFormButton
            w="full"
            leftIcon={<PencilIcon />}
            onClick={() => fileInput.current.click()}
          >
            {auth.profilePicture ? "Change" : "Upload"}
          </ColoredFormButton>
          {auth.profilePicture && (
            <Button
              w="full"
              colorScheme="crimsonScheme"
              color="white"
              leftIcon={<DeleteIcon />}
              onClick={deleteProfilePicture}
            >
              Delete
            </Button>
          )}
        </VStack>

        <chakra.input
          type="file"
          display="none"
          ref={fileInput}
          onChange={handleFiles}
        />
        {isModalOpen && (
          <UploadModal
            isModalOpen={isModalOpen}
            imageURL={imageURL}
            imageFile={imageFile}
            onModalClose={onModalClose}
            setImageFile={setImageFile}
            setImageURL={setImageURL}
          />
        )}
      </Box>
    </>
  );
};

export default ProfilePicChanger;
