import React, { useState, useContext } from "react";
import axiosInstance from "../../config/axios";
import { AuthContext } from "../../store/context/AuthContext";
import ThumbDownIconFilled from "../Shared/icons/ThumbDownIconFilled";
import ThumbUpIconFilled from "../Shared/icons/ThumbUpIconFilled";
import ThumbDownIcon from "../Shared/icons/ThumbDownIcon";
import ThumbUpIcon from "../Shared/icons/ThumbUpIcon";
import PostCommentSection from "./PostCommentSection";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Flex,
  Text,
  Image,
  IconButton,
  HStack,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";

const FeedPost = ({ post }) => {
  const { user } = useContext(AuthContext);

  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [disliked, setDisliked] = useState(post.dislikes.includes(user._id));

  const [numLikes, setNumLikes] = useState(post.likes.length);
  const [numDislikes, setNumDislikes] = useState(post.dislikes.length);

  const handleLiked = (e) => {
    e.preventDefault();

    if (!liked) {
      setLiked(true);
      setNumLikes((prev) => prev + 1);

      if (disliked) {
        setDisliked(false);
        setNumDislikes((prev) => prev - 1);
      }

      axiosInstance.post(`api/posts/${post._id}/like`, {}).catch((err) => {
        setLiked(false);
        setNumLikes((prev) => prev - 1);

        setDisliked(true);
        setNumDislikes((prev) => prev + 1);
      });
    } else {
      setLiked(false);
      setNumLikes((prev) => prev - 1);

      axiosInstance
        .post(`api/posts/${post._id}/removeReaction/likes`, {})
        .catch((err) => {
          setLiked(true);
          setNumLikes((prev) => prev + 1);
          return;
        });
    }
  };

  const handleDisliked = (e) => {
    e.preventDefault();

    if (!disliked) {
      setDisliked(true);
      setNumDislikes((prev) => prev + 1);

      if (liked) {
        setLiked(false);
        setNumLikes((prev) => prev - 1);
      }

      axiosInstance
        .post(
          `api/posts/${post._id}/dislike`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .catch((err) => {
          setDisliked(false);
          setNumDislikes((prev) => prev - 1);

          setLiked(true);
          setNumLikes((prev) => prev + 1);

          return;
        });
    } else {
      setDisliked(false);
      setNumDislikes((prev) => prev - 1);
      axiosInstance
        .post(
          `api/posts/${post._id}/removeReaction/dislikes`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .catch((err) => {
          setDisliked(true);
          setNumDislikes((prev) => prev + 1);

          return;
        });
    }
  };

  return (
    <Box
      bg="primary.900"
      w="full"
      borderColor="gray.800"
      borderRadius={{ base: "none", sm: "xl" }}
      borderWidth={{ base: "0px", sm: "1px" }}
      px={3}
      py={4}
    >
      {/* <Box border="1px" borderColor="gray.800">
        Card
      </Box> */}
      <Box>
        <Box textAlign="left" py={4} justify="space-between" w="full">
          <LinkBox>
            <HStack alignItems={"center"} spacing={2}>
              <Avatar
                position="static"
                size="sm"
                src={post.user.profilePicture}
              />
              <LinkOverlay as={Link} to={`/app/user/${post.user.username}`}>
                <Text fontSize="sm" fontWeight="semibold" className="text-white">
                  {post.user.username}
                </Text>
              </LinkOverlay>
            </HStack>
          </LinkBox>
        </Box>
        <Box mb={3} className="mb-3">
          <Text fontWeight="semibold" className="text-white text-left">
            {post.text}
          </Text>
        </Box>
      </Box>

      <Box className="">
        <Image src={post.postImage} alt={post.text} w="full" />
      </Box>

      <Box mt={2}>
        <Box mb={3} className="flex justify-between align-middle mt-2 mb-3">
          <Flex className="flex" alignItems="center">
            <IconButton
              mr={1}
              variant="ghost"
              color={"tertiary"}
              rounded="full"
              position="static"
              onClick={handleLiked}
              icon={
                liked ? (
                  <ThumbUpIconFilled
                    boxSize={{ base: 7, md: 8 }}
                    className="thumb-up"
                  />
                ) : (
                  <ThumbUpIcon boxSize={{ base: 7, md: 8 }} className="" />
                )
              }
            />

            <Text
              mr={2}
              fontWeight={"semibold"}
              color={"tertiary"}
              className="text-neon-blue font-semibold mr-1 relative top-1.5"
            >
              {numLikes}
            </Text>
            <IconButton
              mr={1}
              variant="ghost"
              color={"#ff3366"}
              rounded="full"
              onClick={handleDisliked}
              icon={
                disliked ? (
                  <ThumbDownIconFilled
                    boxSize={{ base: 7, md: 8 }}
                    className="thumb-down"
                  />
                ) : (
                  <ThumbDownIcon boxSize={{ base: 7, md: 8 }} className="" />
                )
              }
            />

            <Text
              fontWeight={"semibold"}
              color={"#ff3366"}
              className="text-neon-red font-semibold mr-1 relative top-1.5"
            >
              {numDislikes}
            </Text>
          </Flex>

          <Box></Box>
        </Box>

        <Box className="mb-3">
          <PostCommentSection post={post} />
        </Box>
      </Box>
    </Box>
  );
};

export default FeedPost;
