import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
  Image,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";

import axiosInstance from "../../../config/axios";
import PostModalActions from "./PostModalActions";
import PostModalComments from "./PostModalComments";

const PostModal = ({ onDelete, isModalOpen, modalDetails, onModalClose }) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/api/comment/${modalDetails._id}`)
      .then((res) => setComments(res.data));
  }, [modalDetails._id]);

  const addComment = (values, auth) => {
    setComments((prev) => [
      ...prev,
      {
        content: values.comment,
        user: { username: auth.username, profilePicture: auth.profilePicture },
      },
    ]);
  };

  return (
    <Modal
      size={"full"}
      isCentered
      isOpen={isModalOpen}
      onClose={onModalClose}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent bg="primary.800">
        <ModalHeader>Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(12, 1fr)" h="full" flexGrow="1">
            <GridItem colSpan={{ base: 12, lg: 8 }} h="full">
              <Center h="full" bg="black" pos="relative">
                <Image
                  maxHeight={{ lg: "full" }}
                  maxWidth={{ lg: "full" }}
                  height="auto"
                  position={{ lg: "absolute" }}
                  top="0"
                  bottom="0"
                  mx="auto"
                  src={modalDetails.postImage}
                  alt={modalDetails.text}
                />
              </Center>
            </GridItem>
            <GridItem
              bg="primary.900"
              colSpan={{ base: 12, lg: 4 }}
              h="full"
              py={2}
              px={3}
            >
              <Flex flexDirection={"column"} h="full">
                <PostModalActions
                  post={modalDetails}
                  addComment={addComment}
                  onDelete={onDelete}
                />
                <PostModalComments post={modalDetails} comments={comments} />
              </Flex>
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter justifyContent="space-between"></ModalFooter>
      </ModalContent>
    </Modal>
  );

  //     <div >
  //       <div
  //         ref={ref}
  //         
  //       >
  //         <div >
  //           <img
  //             src={post.postImage}
  //             alt={post.text}
  //             
  //           />
  //           <button
  //             
  //             onClick={onClose}
  //           >
  //             <CrossIcon />
  //           </button>
  //         </div>

  //         <div >
  //           <ModalActions
  //             post={post}
  //             addComment={addComment}
  //             onDelete={onDelete}
  //           />
  //           <ModalComments post={post} comments={comments} />
  //         </div>
  //       </div>
  //     </div>,
  //     document.getElementById("modal")
  //   );
};

export default PostModal;
