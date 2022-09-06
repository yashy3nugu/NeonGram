import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axiosInstance from "../../config/axios";
import {
  Center,
  Flex,
  Spinner,
  Text,
  Box,
  Button,
  HStack,
} from "@chakra-ui/react";
import ColoredFormButton from "../Shared/ui/ColoredFormButton";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axiosInstance
      .post(
        "/api/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(() => {
        setLoggedIn(true);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  });

  if (loading) {
    return (
      <Center height="100vh" >
        <Spinner thickness="4px" color="tertiary" size="xl" />
      </Center>
    );
  }

  if (loggedIn) {
    return <Redirect to="/app/feed" />;
  }

  return (
    <Flex direction="column" align="center" w="full" h="100vh" overflow="auto">
      <Center flexGrow={1}>
        <Box textAlign="center">
          <Text
            color="gray.200"
            textShadow={{
              base: "2px 2px #7a27ff",
              sm: "3px 3px #7a27ff",
              md: "4px 4px #7a27ff",
            }}
            as="h1"
            fontSize={{ base: "4xl", sm: "6xl", md: "8xl" }}
          >
            NeonGram
          </Text>
          <Text
            as="h2"
            fontSize={{ base: "sm", sm: "xl", md: "3xl" }}
            mb={{ base: 4, md: 10 }}
          >
            the neon social media app
          </Text>
          <HStack spacing={{ base: 4, md: 8 }} justify="center">
            <Button size={{ base: "xs", sm: "md" }} as={Link} to="/login">
              Login
            </Button>
            <ColoredFormButton
              size={{ base: "xs", sm: "md" }}
              as={Link}
              to="/signup"
            >
              Signup
            </ColoredFormButton>
          </HStack>
        </Box>
      </Center>
    </Flex>
  );
};

export default LandingPage;
