import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const useModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalDetails, setModalDetails] = useState(null);

  const setModal = (details) => {
    setModalDetails(details);
    onOpen();
  };

  return {
    setModal,
    isModalOpen: isOpen,
    onModalClose: onClose,
    modalDetails: modalDetails,
  };
};

export default useModal;
