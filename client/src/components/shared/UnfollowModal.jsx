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
import axiosInstance from "../../config/axios";
import { useContext, useState } from "react";
import { AuthContext } from "../contextProviders/authContext";

const UnfollowModal = ({
  isModalOpen,
  modalDetails,
  onModalClose,
  searchResults,
  setSearchResults,
}) => {
  const { auth, toggleAuth } = useContext(AuthContext);
  const [unfollowLoading, setUnfollowLoading] = useState(false);

  const unFollowUser = async () => {
    try {
      setUnfollowLoading(true);
      await axiosInstance.post("/api/unfollow/", {
        followingUserId: modalDetails._id,
      });
      setUnfollowLoading(false);
      let searchUsers = [...searchResults];
      let unfollowedUser;
      let unfollowedUserIndex;

      searchUsers.forEach((searchUser, idx) => {
        if (searchUser._id === modalDetails._id) {
          unfollowedUserIndex = idx;
        }
      });

      unfollowedUser = { ...searchUsers[unfollowedUserIndex] };

      let index;

      unfollowedUser.followers.forEach((follower, idx) => {
        if (follower === auth._id) {
          index = idx;
        }
      });

      unfollowedUser.followers.splice(index, 1);

      searchUsers[unfollowedUserIndex] = unfollowedUser;

      setSearchResults(searchUsers);

      let currentAuth = { ...auth };

      let authIndex;

      currentAuth.following.forEach((followingUser, idx) => {
        if (modalDetails._id === followingUser) {
          authIndex = idx;
        }
      });

      currentAuth.following.splice(authIndex, 1);

      toggleAuth(currentAuth);
      onModalClose();
    } catch (err) {
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
              <Avatar
                size="lg"
                
                src={modalDetails.profilePicture}
              />

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
            onClick={unFollowUser}
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
