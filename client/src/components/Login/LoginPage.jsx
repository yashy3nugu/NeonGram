import { Flex } from "@chakra-ui/react";
import React from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="relative h-screen">
      <Flex align="center" justify="center" h="100vh">
        <LoginForm />
      </Flex>
    </div>
  );
};

export default LoginPage;
