import React, { useRef, useState, useContext } from "react";
import UploadModal from "../Modals/UploadModal";

import PencilIcon from "../icons/PencilIcon";
import DeleteIcon from "../icons/DeleteIcon";
import axiosInstance from "../../config/axios";
import {
  Box,
  Avatar,
  chakra,
  VStack,
  IconButton,
  HStack,
} from "@chakra-ui/react";

import useModal from "../../hooks/useModal";
import { AuthContext } from "../contextProviders/authContext";

const ProfilePicChanger = () => {
  const fileInput = useRef(null);

  const [imageURL, setImageURL] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const { auth, toggleAuth } = useContext(AuthContext);

  const { isModalOpen, onModalClose, setModal } = useModal();

  const handleFiles = (e) => {
    setImageURL(URL.createObjectURL(e.target.files[0]));
    setImageFile(e.target.files[0]);

    setModal();
  };

  const deleteProfilePicture = async () => {
    setLoading(true);

    try {
      const res = await axiosInstance.delete("/api/deleteProfilePic");
      toggleAuth(res.data.user);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
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
          <HStack>
            <IconButton
              onClick={() => fileInput.current.click()}
              variant="ghost"
              colorScheme="tertiaryScheme"
              icon={<PencilIcon boxSize={6} />}
            />
            {auth.profilePicture && (
              <IconButton
                isLoading={loading}
                onClick={deleteProfilePicture}
                variant="ghost"
                colorScheme="crimsonScheme"
                icon={<DeleteIcon boxSize={6} />}
              />
            )}
          </HStack>
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
