import React, { useRef, useState, useContext } from "react";
import UploadModal from "../Modals/UploadModal";

import PencilIcon from "../Shared/icons/PencilIcon";
import DeleteIcon from "../Shared/icons/DeleteIcon";
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
import { AuthContext } from "../../store/context/AuthContext";

const ProfilePicChanger = () => {
  const fileInput = useRef(null);

  const [imageURL, setImageURL] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const { user, removeProfilePicture } = useContext(AuthContext);

  const { isModalOpen, onModalClose, setModal } = useModal();

  const handleFiles = (e) => {
    setImageURL(URL.createObjectURL(e.target.files[0]));
    setImageFile(e.target.files[0]);

    setModal();
  };

  const deleteProfilePicture = async () => {
    setLoading(true);

    try {
      await axiosInstance.delete("/api/deleteProfilePic");
      // toggleAuth(res.data.user);
      removeProfilePicture();
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
            src={user.profilePicture}
            alt={`${user.username}'s profile`}
            size="2xl"
          />
          <HStack>
            <IconButton
              onClick={() => fileInput.current.click()}
              variant="ghost"
              colorScheme="tertiaryScheme"
              icon={<PencilIcon boxSize={6} />}
            />
            {user.profilePicture && (
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
