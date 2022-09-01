import { Flex } from "@chakra-ui/react";
import React from "react";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return (
    <Flex flexDirection="column" align="center" justify="center" h="100vh">
      <SignUpForm />
    </Flex >
  );
};

export default SignUpPage;
