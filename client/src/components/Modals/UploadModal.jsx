import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Cropper from "react-cropper";

import axiosInstance from "../../config/axios";

import "cropperjs/dist/cropper.css";
import { useContext } from "react";
import { AuthContext } from "../contextProviders/authContext";

const UploadModal = ({
  onModalClose,
  imageURL,
  imageFile,
  isModalOpen,
  setImageURL,
  setImageFile,
}) => {
  // const [imageURL, setImageURL] = useState(null);

  const [croppedImage, setCroppedImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const { toggleAuth } = useContext(AuthContext);

  const saveProfilePicture = async (e) => {
    setLoading(true);
    // if (croppedImage) {
    //   const fd = new FormData();
    //   const imageSettings = JSON.stringify(
    //     croppedImage.getData({ rounded: true })
    //   );
    //   fd.append("profilePicture", imageFile);
    //   fd.append("imageSettings", imageSettings);
    //   axiosInstance
    //     .post("/api/addProfilePic", fd)
    //     .then((res) => window.location.reload());
    // }

    if (!croppedImage) {
      return;
    }

    try {
      const fd = new FormData();
      const imageSettings = JSON.stringify(
        croppedImage.getData({ rounded: true })
      );
      fd.append("profilePicture", imageFile);
      fd.append("imageSettings", imageSettings);
      const res = await axiosInstance.post("/api/addProfilePic", fd);
      toggleAuth(res.data.user);
      setLoading(false);
      onModalClose();
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Modal
      size="xl"
      isOpen={isModalOpen}
      onClose={() => {
        setImageURL(null);
        setImageFile(null);
        onModalClose();
      }}
    >
      <ModalOverlay />
      <ModalContent bg="primary.800">
        <ModalCloseButton />
        <ModalHeader>Upload</ModalHeader>
        <ModalBody>
          {imageURL && imageFile && (
            <Cropper
              src={imageURL}
              style={{ height: 300, width: "100%" }}
              background={false}
              aspectRatio={1}
              viewMode={1}
              onInitialized={(instance) => setCroppedImage(instance)}
              responsive={true}
            ></Cropper>
          )}
        </ModalBody>
        <ModalFooter>
          <Button isLoading={loading} onClick={saveProfilePicture}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadModal;
