import React, { useState, useContext } from "react";
import ThumbDownIconFilled from "../icons/ThumbDownIconFilled";
import ThumbUpIconFilled from "../icons/ThumbUpIconFilled";

import DeleteIconSolid from "../icons/DeleteIconSolid";
import { AuthContext } from "../../../store/context/AuthContext";
import axiosInstance from "../../../config/axios";
import { Formik, Form } from "formik";
import ThumbDownIcon from "../icons/ThumbDownIcon";
import ThumbUpIcon from "../icons/ThumbUpIcon";
import {
  Box,
  LinkBox,
  LinkOverlay,
  HStack,
  Avatar,
  IconButton,
  Flex,
  Text,
  Input,
  Button
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AppFormField from "../ui/AppFormField";

const PostModalActions = ({ post, addComment, onDelete }) => {
  const { user } = useContext(AuthContext);

  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [disliked, setDisliked] = useState(post.dislikes.includes(user._id));

  const [numLikes, setNumLikes] = useState(post.likes.length);
  const [numDislikes, setNumDislikes] = useState(post.dislikes.length);
  const [loading, setLoading] = useState(false);

  const handleLiked = (e) => {
    // e.preventDefault();

    if (!liked) {
      setLiked(true);
      setNumLikes((prev) => prev + 1);

      if (disliked) {
        setDisliked(false);
        setNumDislikes((prev) => prev - 1);
      }

      axiosInstance.post(`/api/posts/${post._id}/like`, {}).catch((err) => {
        setLiked(false);
        setNumLikes((prev) => prev - 1);

        setDisliked(true);
        setNumDislikes((prev) => prev + 1);
      });
    } else {
      setLiked(false);
      setNumLikes((prev) => prev - 1);

      axiosInstance
        .post(`/api/posts/${post._id}/removeReaction/likes`, {})
        .catch((err) => {
          setLiked(true);
          setNumLikes((prev) => prev + 1);
          return;
        });
    }
  };
  const handleDisliked = (e) => {
    // e.preventDefault();

    if (!disliked) {
      setDisliked(true);
      setNumDislikes((prev) => prev + 1);

      if (liked) {
        setLiked(false);
        setNumLikes((prev) => prev - 1);
      }

      axiosInstance.post(`/api/posts/${post._id}/dislike`, {}).catch((err) => {
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
        .post(`/api/posts/${post._id}/removeReaction/dislikes`, {})
        .catch((err) => {
          setDisliked(true);
          setNumDislikes((prev) => prev + 1);

          return;
        });
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <LinkBox>
          <HStack my={2}>
            <Avatar src={post.user.profilePicture} size="sm" />

            <Box className="ml-4">
              <LinkOverlay
                fontWeight="semibold"
                as={Link}
                to={`/app/user/${post.user.username}`}
              >
                {post.user.username}
              </LinkOverlay>
            </Box>
          </HStack>
        </LinkBox>

        {user._id === post.user._id && (
          <IconButton
            colorScheme="crimsonScheme"
            variant="ghost"
            isLoading={loading}
            icon={<DeleteIconSolid boxSize={6} />}
            onClick={() => {
              setLoading(true);
              onDelete(post._id);
            }}
          />
        )}
      </Flex>
      <Box mt={2} mb={8} className="text-gray-400 mt-2 mb-8">
        <Text>{post.text}</Text>
      </Box>
      <Flex
        mt={2}
        mb={3}
        alignItems="center"
        className="flex justify-between align-middle mt-2 mb-3"
      >
        {/* <button onClick={handleLiked} className="mx-2 outline-none w-7 sm:w-8 text-neon-blue">{liked ? <ThumbUpIconFilled className="thumb-up w-7" /> : <ThumbUpIcon className="w-7" />}</button> */}

        <IconButton
          mr={1}
          variant="ghost"
          color={"tertiary"}
          rounded="full"
          position="static"
          onClick={handleLiked}
          icon={
            liked ? (
              <ThumbUpIconFilled boxSize={{ base: 7, md: 8 }} />
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

      <Formik
        initialValues={{
          comment: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.comment) {
            errors.comment = "comment required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          axiosInstance
            .post(`/api/comment/${post._id}`, {
              content: values.comment,
            })
            .then((res) => {
              console.log(values);
              addComment(values, user);
              values.comment = "";
            })
            .catch((err) => console.log(err));
          // setComments(prev => [...prev, { content: values.comment, user: { username: auth.username } }]);

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form autoComplete="off" className="flex mb-4">
            <HStack alignItems="center">
              <AppFormField
                as={Input}
                type="text"
                maxLength="600"
                name="comment"
                placeholder="Add a comment..."
              />
              <Button
                type="submit"
                variant="ghost"
                colorScheme="tertiaryScheme"
                isLoading={isSubmitting}
                disabled={!(isValid && dirty)}
                className="w-10 text-neon-green disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PostModalActions;
