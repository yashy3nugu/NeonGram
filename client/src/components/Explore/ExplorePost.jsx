import { Box, Image } from "@chakra-ui/react";
import React from "react";

const ExplorePost = ({ post, showPost }) => {
  return (
    <Box
      className="explore__post rounded-lg overflow-hidden"
      onClick={() => showPost(post)}
      cursor="pointer"
      
    >
      <Image
        src={post.postImage}
        alt={post.text}
        w="full"
        h={{ base: "13rem", md: "50rem", xl: "18rem" }}
        objectFit="cover"
        rounded="lg"
        className="w-full object-cover h-52 md:h-60 lg:h-60 xl:h-72"
      />
    </Box>
  );
};

export default ExplorePost;
