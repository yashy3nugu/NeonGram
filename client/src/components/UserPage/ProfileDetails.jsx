import React, { useContext, useState, useEffect } from "react";

// import UnfollowModal from "../Modals/UnfollowModal";
import axiosInstance from "../../config/axios";
import { AuthContext } from "../../store/context/AuthContext";
import { useHistory } from "react-router-dom";
import SettingsIconSolid from "../Shared/icons/SettingsIconSolid";

import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  IconButton,
  VStack,
  Text,
  SimpleGrid,
  Button,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import useModal from "../../hooks/useModal";
import UnfollowModal from "../Shared/modal/UnfollowModal";
import ColoredFormButton from "../Shared/ui/ColoredFormButton";

const ProfileDetails = ({ user }) => {
  const history = useHistory();

  const { user: authUser } = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState(null);

  const [followLoading, setfollowLoading] = useState(false);

  const [userLoading, setUserLoading] = useState(true);

  const { isModalOpen, onModalClose, modalDetails, setModal } = useModal();

  useEffect(() => {
    setUserLoading(true);

    axiosInstance.get(`/api/details/${user}`).then((res) => {
      setUserDetails(res.data);
      setUserLoading(false);
    });
  }, [user]);

  const followUser = async () => {
    setfollowLoading(true);

    try {
      await axiosInstance.patch("/api/follow", {
        followingUserId: userDetails._id,
      });
    } catch (error) {
      setfollowLoading(false);
    }
    const followers = [...userDetails.followers];

    followers.push(authUser._id);

    setUserDetails((prev) => {
      return {
        ...prev,
        followers,
      };
    });

    setfollowLoading(false);
  };

  const unFollowUser = async () => {
    await axiosInstance.post("/api/unfollow/", {
      followingUserId: modalDetails._id,
    });

    const followers = [...userDetails.followers];

    let followerIndex;

    followers.forEach((follower, idx) => {
      if (follower === authUser._id) {
        followerIndex = idx;
      }
    });

    followers.splice(followerIndex, 1);

    setUserDetails((prev) => {
      return {
        ...prev,
        followers,
      };
    });
  };

  return (
    <>
      {modalDetails && (
        <UnfollowModal
          isModalOpen={isModalOpen}
          onModalClose={onModalClose}
          modalDetails={modalDetails}
          unFollowUser={unFollowUser}
        />
      )}

      {userLoading && (
        <>
          <Center>
            <Box>
              <SkeletonCircle size="8rem" />
            </Box>
          </Center>
          <SkeletonText w="md" mx={"auto"} noOfLines={4} mt={4} />
        </>
      )}

      {userDetails && (
        <Box >
          <Center>
            <Box>
              <Avatar size={{base:"lg", sm:"xl", md: "2xl"}} src={userDetails.profilePicture}>
                {userDetails.username === authUser.username && (
                  <AvatarBadge borderWidth={0}>
                    <IconButton
                      onClick={() => history.push("/settings")}
                      variant="ghost"
                      color="gray"
                      rounded="full"
                      icon={<SettingsIconSolid boxSize={{base: 5, sm:7, md: 8}} />}
                    />
                  </AvatarBadge>
                )}
              </Avatar>
            </Box>
          </Center>
          <Center>
            <VStack mt={4} spacing={3}>
              <Text as="h1" fontSize={{base:"xl", sm:"2xl", md:"3xl"}} fontWeight="semibold">
                {userDetails.username}
              </Text>
              <Text as="p" fontSize={{base:"sm", sm: "md", md: "lg"}} color="gray.400">
                {userDetails.bio}
              </Text>
              <SimpleGrid columns={2} spacing={20} fontSize={{base:"sm", sm: "md", md: "lg"}}>
                <Text as="span" >
                  <Text as="strong">{userDetails.followers.length}</Text>{" "}
                  followers
                </Text>
                <Text as="span" >
                  <Text as="strong">{userDetails.following.length}</Text>{" "}
                  following
                </Text>
              </SimpleGrid>
              <Box w="full">
                {!userDetails._id === authUser._id &&
                  (userDetails.followers.includes(authUser._id) ? (
                    <Button
                      w="full"
                      onClick={() => setModal(userDetails)}
                      
                    >
                      Following
                    </Button>
                  ) : (
                    <ColoredFormButton
                      onClick={followUser}
                      isLoading={followLoading}
                      w="full"
                    >
                      Follow
                    </ColoredFormButton>
                  ))}
              </Box>
            </VStack>
          </Center>
        </Box>
      )}
    </>
  );
};

export default ProfileDetails;
