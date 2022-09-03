import React, { useState } from "react";
import { useParams } from "react-router-dom";

import ProfileDetails from "./ProfileDetails";

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
        mt={{ lg: 50 }}
        mb={{ lg: 50 }}
        bg={"primary.900"}
        w={{ base: "full", md: "full", lg: "full" }}
        maxWidth={{lg: "3xl"}}
        mx="auto"
        px={10}
        py={10}
        borderWidth={{ lg: "1px" }}
        borderRadius={{ lg: "xl" }}
      >
        <ProfileDetails user={user} />
        <Divider my={8} />
        <PostGallery user={user} removePost={removePost} />
      </Box>
    </>
  );
};

export default UserPage;
