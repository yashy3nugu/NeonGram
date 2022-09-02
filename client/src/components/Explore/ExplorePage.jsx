import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios";
import { Waypoint } from "react-waypoint";
import ExplorePost from "./ExplorePost";
import PostModal from "../shared/PostModal";
import { Box, SimpleGrid, Skeleton } from "@chakra-ui/react";
import useModal from "../../hooks/useModal";

const ExplorePage = () => {
  const [explorePosts, setExplorePosts] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [latestLastTimestamp, setLatestLastTimestamp] = useState(null);

  const { isModalOpen, onModalClose, modalDetails, setModal } = useModal();

  useEffect(() => {
    axiosInstance.get("/api/posts/").then((res) => {
      setExplorePosts(res.data);
    });
  }, []);

  const handlePagination = () => {
    if (!hasNext) {
      return;
    }

    const lastTime = explorePosts[explorePosts.length - 1].time;

    if (lastTime === latestLastTimestamp) {
      return;
    }

    setLatestLastTimestamp(lastTime);

    setLoading(true);

    axiosInstance
      .get("/api/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          lastTime,
        },
      })
      .then((res) => {
        if (res.data.length) {
          setExplorePosts((prev) => [...prev, ...res.data]);
          setLoading(false);
        } else {
          setLoading(false);
          setHasNext(false);
        }
      });
  };

  const showPost = (post) => {
    setModal(post);
  };

  const onDelete = (id) => {
    axiosInstance.delete(`/api/posts/${id}`).then(() => {
      setExplorePosts((prev) => {
        const remainingPosts = prev.filter((post) => {
          return !(post._id === id);
        });

        return remainingPosts;
      });

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
      <Box
        mt={50}
        mb={50}
        w="full"
        mx="auto"
        px={10}
        py={10}
        className="container px-2 mx-auto"
      >
        <SimpleGrid
          columns={{ base: 2, sm: 3, lg: 4, xl: 5 }}
          spacing={5}
          my={10}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-10"
        >
          {/* <pre className="text-white">{JSON.stringify(explorePosts,null,2)}</pre> */}
          {explorePosts.map((post, idx) => (
            <Box key={idx}>
              {idx === explorePosts.length - 1 && (
                <Waypoint
                  onEnter={handlePagination}
                  // scrollableAncestor={window}
                />
              )}
              <ExplorePost post={post} showPost={showPost} />
            </Box>
          ))}

          {loading && (
            <>
              <Skeleton
                rounded="lg"
                w="full"
                h={{ base: "13rem", md: "15rem", xl: "18rem" }}
              />
            </>
          )}
        </SimpleGrid>
        {/* <Box>
          <SpinnerIcon styles="block mx-auto" enabled={loading} size="6rem" />
        </Box> */}
      </Box>
    </>
  );
};

export default ExplorePage;
