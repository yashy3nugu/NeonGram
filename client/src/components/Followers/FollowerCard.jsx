import {
  Box,
  HStack,
  LinkBox,
  Avatar,
  LinkOverlay,
  IconButton,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AuthContext } from "../ContextProviders/AuthContext";
import UserAddIconSolid from "../shared/icons/UserAddIconSolid";
import ColoredFormIconButton from "../shared/ui/ColoredFormIconButton";
import TickIcon from "../shared/icons/TickIcon";
import axiosInstance from "../../config/axios";

const FollowerCard = ({
  user,
  setModal,
  searchResults,
  setSearchResults,
  ...props
}) => {
  const { auth, toggleAuth } = useContext(AuthContext);
  const [followLoading, setFollowLoading] = useState(false);

  const followUser = async () => {
    try {
      setFollowLoading(true);
      await axiosInstance.post("/api/follow/", { followingUserId: user._id });
      setFollowLoading(false);
      let searchUsers = [...searchResults];

      let followedUserIndex;
      let followedUser;

      searchUsers.forEach((searchUser, index) => {
        if (searchUser._id === user._id) {
          followedUserIndex = index;
        }
      });

      followedUser = { ...searchUsers[followedUserIndex] };
      followedUser.followers.push(auth._id);
      searchUsers[followedUserIndex] = followedUser;
      setSearchResults(searchUsers);

      let currentAuth = { ...auth };
      currentAuth.following.push(user._id);
      toggleAuth(currentAuth);
    } catch (error) {
      setFollowLoading(false);
    }
  };

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      {...props}
      w="full"
    >
      <HStack>
        <LinkBox href={`/user/${user.username}`}>
          <HStack>
            <Avatar src={user.profilePicture} size="sm" />

            <Box className="ml-4">
              <LinkOverlay
                fontWeight="semibold"
                href={`/app/user/${user.username}`}
              >
                {user.username}
              </LinkOverlay>

              {/* <Text className="text-gray-300 text-xs sm:text-sm text-left">
                {user.followers.length}{" "}
                {user.followers.length === 1 ? "follower" : "followers"}
              </Text> */}
            </Box>
          </HStack>
        </LinkBox>
      </HStack>

      {auth.following.includes(user._id) ? (
        <IconButton
          rounded="full"
          onClick={() => setModal(user)}
          icon={<TickIcon boxSize={5} />}
        />
      ) : (
        auth.username !== user.username && (
          <ColoredFormIconButton
            rounded="full"
            onClick={followUser}
            isLoading={followLoading}
            icon={<UserAddIconSolid />}
          />
        )
      )}
    </HStack>
  );
};

export default FollowerCard;
