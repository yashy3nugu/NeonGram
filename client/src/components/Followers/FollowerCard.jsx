import {
  Box,
  HStack,
  LinkBox,
  Avatar,
  LinkOverlay,
  IconButton,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/context/AuthContext";
import UserAddIconSolid from "../Shared/icons/UserAddIconSolid";
import ColoredFormIconButton from "../Shared/ui/ColoredFormIconButton";
import TickIcon from "../Shared/icons/TickIcon";
import axiosInstance from "../../config/axios";
import { Link } from "react-router-dom";

const FollowerCard = ({
  user,
  setModal,
  searchResults,
  setSearchResults,
  ...props
}) => {
  const { user: authUser, addFollowing } = useContext(AuthContext);
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
      followedUser.followers.push(authUser._id);
      searchUsers[followedUserIndex] = followedUser;
      setSearchResults(searchUsers);
      addFollowing(user._id);
      
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
        <LinkBox>
          <HStack>
            <Avatar src={user.profilePicture} size="sm" />

            <Box className="ml-4">
              <LinkOverlay
                fontWeight="semibold"
                as={Link}
                to={`/app/user/${user.username}`}
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

      {authUser.following.includes(user._id) ? (
        <IconButton
          rounded="full"
          onClick={() => setModal(user)}
          icon={<TickIcon boxSize={5} />}
        />
      ) : (
        authUser.username !== user.username && (
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
