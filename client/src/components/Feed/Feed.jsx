import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios";
import { useHistory } from "react-router-dom";
import FeedPost from "./FeedPost";
import { Waypoint } from "react-waypoint";
import styles from "./FeedStyles";
import { Grid, GridItem, VStack, Spinner, Center,Text } from "@chakra-ui/react";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [latestLastTimestamp, setLatestLastTimestamp] = useState(null);
  const [feedEmpty, setFeedEmpty] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/api/posts/following")
      .then((res) => {
        setLoading(false);
        if (res.data.length) {
          setPosts(res.data);
        } else {
          setFeedEmpty(true);
          setHasNext(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          history.push("/");
        }
      });
  }, [history]);

  const handlePagination = () => {
    if (!hasNext) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const lastTime = posts[posts.length - 1].time;

    if (lastTime === latestLastTimestamp) {
      return;
    }

    setLatestLastTimestamp(lastTime);

    axiosInstance
      .get("/api/posts/following", {
        params: {
          lastTime,
        },
      })
      .then((res) => {
        setLoading(false);

        if (res.data.length) {
          setPosts((prev) => [...prev, ...res.data]);
        } else {
          setHasNext(false);
        }
      });
  };

  return (
    <Grid {...styles.container}>
      <GridItem {...styles.content}>
        <VStack spacing={{ base: 4, md: 10 }} align="stretch">
          {posts.map((post, idx) => (
            <div key={idx}>
              {idx === posts.length - 1 && (
                <Waypoint onEnter={handlePagination} />
              )}
              <FeedPost post={post} />
            </div>
          ))}
          {posts.length === 0 && feedEmpty && (
            <Center>
              <Text fontSize={{base:"md",md:"xl"}} color="gray.400" textAlign={"center"}>
                No posts to show. Try following someone by visiting the explore page
              </Text>
            </Center>
          )} 
        </VStack>
        {loading && (
          <Center mt={4}>
            <Spinner thickness="4px" color="tertiary" size="xl" />
          </Center>
        )}
      </GridItem>
    </Grid>
  );
};

export default Feed;
