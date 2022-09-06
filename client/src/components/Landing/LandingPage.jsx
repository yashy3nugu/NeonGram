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
      <Center height="100vh" className="relative">
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
            sx={{
              // 'text-shadow': "0 0 0.08em #fffff, 0 0 1rem tertiary, 0 0 1.5rem #ffffff, 0 0 1.8rem #ffffff"
              textShadow: "4px 4px #7a27ff",
            }}
            as="h1"
            fontSize="8xl"
          >
            NeonGram
          </Text>
          <Text fontSize="3xl" mb={10}>
            the neon social media app
          </Text>
          <HStack spacing={12} justify="center">
            <Button as={Link} to="/login">
              Login
            </Button>
            <ColoredFormButton as={Link} to="/signup">
              Signup
            </ColoredFormButton>
          </HStack>
        </Box>
      </Center>
    </Flex>
  );
};

export default LandingPage;
