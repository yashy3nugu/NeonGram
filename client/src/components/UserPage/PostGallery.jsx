import { Image, SimpleGrid, Box, Skeleton } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axios";
import useModal from "../../hooks/useModal";
import PostModal from "../shared/PostModal";

const PostGallery = ({ removePost, user }) => {
  const [clickedPost, setClickedPost] = useState(null);

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

  const onClose = () => {
    setClickedPost(null);
    document.body.style.overflow = "unset";
  };

  const onDelete = (id) => {
    axiosInstance.delete(`/api/posts/${id}`).then(() => {
      onClose();
      removePost(id);
    });
  };

  return (
    <>
      {isModalOpen && (
        <PostModal isModalOpen={isModalOpen} onModalClose={onModalClose} modalDetails={modalDetails} />
      )}
      <div className="max-w-4xl px-3 mx-auto text-center">
        <SimpleGrid columns={3} spacing={8}>
          {posts &&
            posts.map((post, idx) => (
              <Box>
                <Image
                  key={post._id}
                  objectFit="cover"
                  height={{ base: "12rem", sm: "14rem", md: "18rem" }}
                  width="full"
                  src={post.postImage}
                  alt={post.text}
                  onClick={() => {
                    setModal(post);
                  }}
                />
              </Box>
            ))}
          {loading &&
            [...Array(3)].map((_, idx) => (
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
      </div>
    </>
  );
};

export default PostGallery;
