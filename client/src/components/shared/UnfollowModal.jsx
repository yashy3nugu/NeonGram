import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Center,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useState } from "react";

const UnfollowModal = ({
  isModalOpen,
  modalDetails,
  onModalClose,

  unFollowUser,
}) => {
  const [unfollowLoading, setUnfollowLoading] = useState(false);

  const unFollow = async () => {
    try {
      setUnfollowLoading(true);

      await unFollowUser();

      setUnfollowLoading(false);
      onModalClose();
    } catch (error) {
      setUnfollowLoading(false);
    }
  };

  return (
    <Modal size={"xs"} isCentered isOpen={isModalOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent bg="primary.800">
        <ModalHeader>Unfollow</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <VStack>
              <Avatar size="lg" src={modalDetails.profilePicture} />

              <Text>
                Unfollow{" "}
                <Text fontWeight="semibold" as="span">
                  {modalDetails.username}?
                </Text>
              </Text>
            </VStack>
          </Center>
        </ModalBody>

        <ModalFooter justifyContent="space-between">
          <Button onClick={onModalClose}>Close</Button>
          <Button
            onClick={async () => await unFollow()}
            variant="ghost"
            colorScheme={"crimsonScheme"}
            isLoading={unfollowLoading}
          >
            Unfollow
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UnfollowModal;
