import React, { useContext, useState, useEffect } from "react";

// import UnfollowModal from "../Modals/UnfollowModal";
import axiosInstance from "../../config/axios";
import { AuthContext } from "../contextProviders/authContext";
import { useHistory } from "react-router-dom";
import SettingsIconSolid from "../icons/SettingsIconSolid";

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
import UnfollowModal from "../shared/UnfollowModal";
import ColoredFormButton from "../shared/ColoredFormButton";

const ProfileDetails = ({ user }) => {
  const history = useHistory();

  const { auth } = useContext(AuthContext);

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

    followers.push(auth._id);

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
      if (follower === auth._id) {
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
        <Box className="container mx-auto mt-5 sm:mt-20">
          <Center>
            <Box>
              <Avatar size="2xl" src={userDetails.profilePicture}>
                {userDetails.username === auth.username && (
                  <AvatarBadge borderWidth={0}>
                    <IconButton
                      onClick={() => history.push("/settings")}
                      variant="ghost"
                      color="gray"
                      rounded="full"
                      icon={<SettingsIconSolid boxSize={8} />}
                    />
                  </AvatarBadge>
                )}
              </Avatar>
            </Box>
          </Center>
          <Center>
            <VStack mt={4} spacing={3}>
              <Text as="h1" fontSize="3xl" fontWeight="semibold">
                {userDetails.username}
              </Text>
              <Text as="p" color="gray.400">
                {userDetails.bio}
              </Text>
              <SimpleGrid columns={2} spacing={20}>
                <Text as="span" className="text-gray-300">
                  <Text as="strong">{userDetails.followers.length}</Text>{" "}
                  followers
                </Text>
                <Text as="span" className="text-gray-300">
                  <Text as="strong">{userDetails.following.length}</Text>{" "}
                  following
                </Text>
              </SimpleGrid>
              <Box w="full">
                {!userDetails._id === auth._id &&
                  (userDetails.followers.includes(auth._id) ? (
                    <Button
                      w="full"
                      onClick={() => setModal(userDetails)}
                      className="w-2/3 sm:w-1/3 bg-gray-900 border border-gray-300 px-3 py-2 mt-6 text-sm text-gray-300 rounded-lg"
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
