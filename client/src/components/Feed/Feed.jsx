import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios";
import { useHistory } from "react-router-dom";
import FeedPost from "./FeedPost";
import { Waypoint } from "react-waypoint";
import SpinnerIcon from "../icons/SpinnerIcon";
import styles from "./FeedStyles";
import { Grid, GridItem, VStack, Spinner, Box, Center } from "@chakra-ui/react";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

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
    axiosInstance
      .get("/api/posts/following", {
        params: {
          lastTime,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.length) {
          setPosts((prev) => [...prev, ...res.data]);
        } else {
          console.log("no data");
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