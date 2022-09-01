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

import CrossIcon from "../icons/CrossIcon";

import axiosInstance from "../../config/axios";
import ModalActions from "../Modals/ModalActions";
import ModalComments from "../Modals/ModalComments";

const PostModal = ({
  post,
  onClose,
  onDelete,
  isModalOpen,
  modalDetails,
  onModalClose,
}) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/api/comment/${modalDetails._id}`)
      .then((res) => setComments(res.data));
  }, [modalDetails._id]);

  const addComment = (values, auth) => {
    console.log(values);
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
      
    >
      <ModalOverlay />
      <ModalContent bg="primary.800">
        <ModalHeader>Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={"flex"} flexDirection="column">
          <Grid templateColumns="repeat(12, 1fr)" h="full" flexGrow="1">
            <GridItem colSpan={8} h="full">
              <Center h="full" bg="black">
                <Image
                  maxHeight="full"
                  maxWidth="full"
                  src={modalDetails.postImage}
                  alt={modalDetails.text}
                />
              </Center>
            </GridItem>
            <GridItem bg="primary.900" colSpan={4} h="full" py={2} px={3}>
              <Flex flexDirection={"column"} h="full">
                <ModalActions post={modalDetails} addComment={addComment} onDelete={onDelete} />
                <ModalComments post={modalDetails} comments={comments} />
              </Flex>
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter justifyContent="space-between"></ModalFooter>
      </ModalContent>
    </Modal>
  );

  //   return createPortal(
  //     <div className="post-modal z-10 fixed top-0 left-0 right-0 bottom-0">
  //       <div
  //         ref={ref}
  //         className="post-modal__post bg-gray-900 flex flex-col w-full h-full overflow-y-scroll sm:flex-row lg:w-4/5 sm:h-4/6 lg:h-5/6 pb-0"
  //       >
  //         <div className="relative sm:w-10/12 md:w-9/12 lg:w-8/12 bg-black">
  //           <img
  //             src={post.postImage}
  //             alt={post.text}
  //             className="mx-auto w-full sm:max-h-full sm:max-w-full sm:w-auto sm:h-auto sm:absolute sm:top-0 sm:bottom-0 sm:left-0 sm:right-0 sm:m-auto"
  //           />
  //           <button
  //             className="text-neon-red w-7 absolute right-1 top-1 sm:hidden"
  //             onClick={onClose}
  //           >
  //             <CrossIcon />
  //           </button>
  //         </div>

  //         <div className="px-3 py-2 flex flex-col border-neon-purple sm:flex-grow">
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
