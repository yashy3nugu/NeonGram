import { Flex } from "@chakra-ui/react";
import React from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <Flex flexDirection="column" align="center" justify="center" h="100vh">
      <LoginForm />
    </Flex>
  );
};

export default LoginPage;
