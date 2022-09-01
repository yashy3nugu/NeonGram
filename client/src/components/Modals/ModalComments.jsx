import React from "react";
import UserIcon from "../icons/UserIcon";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";

const ModalComments = ({ post, comments }) => {
  return (
    <Box
      px={2}
      py={4}
      // bg="primary.800"
      bg="whiteAlpha.50"
      mb={3}
      mt={3}
      // flexGrow={1}
      border="1px"
      rounded="lg"
      borderColor="gray.700"
      className="bg-gray-800 px-2 py-2 h-40 sm:flex-grow sm:mb-2 overflow-scroll rounded-lg"
    >
      <VStack
        align="stretch"
        spacing={5}
        className=" text-white"
        maxHeight="30rem"
        minHeight="30rem"
        overflowY="auto"
      >
        {comments
          ? comments.map((comment, idx) => {
              return (
                <Box py={1} className="py-1.5 flex items-center" key={idx}>
                  <LinkBox>
                    <HStack alignItems="center">
                      <Avatar
                        size="xs"
                        src={comment.user.profilePicture}
                        alt={comment.user.username}
                      />
                      <LinkOverlay
                        href={`/${comment.user.username}`}
                        className="font-semibold"
                      >
                        <Text fontWeight="semibold">
                          {comment.user.username}
                        </Text>
                      </LinkOverlay>
                    </HStack>
                  </LinkBox>

                  <Text as="span" className="relative bottom-1"></Text>
                  {comment.content}
                </Box>
              );
            })
          : // <li className="text-gray-400">
            //   {" "}
            //   <p>No comments yet...</p>
            // </li>
            [...Array(5)].map((_, idx) => <Skeleton key={idx} height={12} width="full" />)}
      </VStack>
    </Box>
  );
};

export default ModalComments;
