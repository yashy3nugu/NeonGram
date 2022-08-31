import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axios";
import ProfileDetails from "./ProfileDetails";
import SpinnerIcon from "../icons/SpinnerIcon";
import PostGallery from "./PostGallery";
import { Box, Divider } from "@chakra-ui/react";

const UserPage = () => {
  const [posts, setPosts] = useState(null);

  const { user } = useParams();

  const removePost = (id) => {
    const currentPosts = [...posts];
    let removeIndex;

    currentPosts.forEach((post, idx) => {
      if (id === post._id) {
        removeIndex = idx;
      }
    });

    currentPosts.splice(removeIndex, 1);

    setPosts(currentPosts);
  };

  return (
    <>
      <Box
        mt={50}
        mb={50}
        bg={"primary.900"}
        width="4xl"
        maxWidth="4xl"
        mx="auto"
        px={10}
        py={10}
        borderWidth="1px"
        borderRadius="xl"
      >
        <ProfileDetails user={user} />
        <Divider my={8} />
        <PostGallery user={user} posts={posts} removePost={removePost} />

      </Box>

      
    </>
  );
};

export default UserPage;
