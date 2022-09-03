import { Image, SimpleGrid, Box, Skeleton } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axios";
import useModal from "../../hooks/useModal";
import PostModal from "../Shared/modal/PostModal";

const PostGallery = ({ user }) => {
  const { isModalOpen, onModalClose, modalDetails, setModal } = useModal();

  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`/api/posts/user/${user}`).then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, [user]);

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

  const onDelete = (id) => {
    axiosInstance.delete(`/api/posts/${id}`).then(() => {
      removePost(id);
      onModalClose();
    });
  };

  return (
    <>
      {isModalOpen && (
        <PostModal
          isModalOpen={isModalOpen}
          onModalClose={onModalClose}
          modalDetails={modalDetails}
          onDelete={onDelete}
        />
      )}
      <Box className="max-w-4xl px-3 mx-auto text-center">
        <SimpleGrid columns={{ base: 2, sm: 2 }} spacing={5}>
          {posts &&
            posts.map((post, idx) => (
              <Box key={idx}>
                <Image
                  key={post._id}
                  objectFit="cover"
                  height={{ base: "12rem", sm: "14rem", md: "18rem" }}
                  width="full"
                  src={post.postImage}
                  alt={post.text}
                  cursor="pointer"
                  rounded="lg"
                  onClick={() => {
                    setModal(post);
                  }}
                />
              </Box>
            ))}
          {loading &&
            [...Array(2)].map((_, idx) => (
              <Skeleton
                key={idx}
                height={{ base: "12rem", sm: "14rem", md: "18rem" }}
                width="full"
              />
            ))}
        </SimpleGrid>

        {/* <div className="text-center grid grid-cols-2 sm:grid-cols-3 gap-6 mx-auto w-full mb-6">
        {posts &&
          posts.map((post) => (
            <div className="">
              <img
                src={post.postImage}
                alt={post.text}
                key={post._id}
                className="object-cover h-48 sm:h-56 md:h-72 w-full"
                onClick={() => setClickedPost(post)}
              />
            </div>
          ))}

        {clickedPost && (
          <PostModal post={clickedPost} onClose={onClose} onDelete={onDelete} />
        )}
      </div> */}
      </Box>
    </>
  );
};

export default PostGallery;
