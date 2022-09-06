import { Box, Image } from "@chakra-ui/react";
import React from "react";

const ExplorePost = ({ post, showPost }) => {
  return (
    <Box
      onClick={() => showPost(post)}
      cursor="pointer"
      
    >
      <Image
        src={post.postImage}
        alt={post.text}
        w="full"
        h={{ base: "13rem", md: "15rem", xl: "18rem" }}
        objectFit="cover"
        rounded="lg"
      />
    </Box>
  );
};

export default ExplorePost;
