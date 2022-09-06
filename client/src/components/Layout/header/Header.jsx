import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <Box w="full" bg="primary.900" as="header" position="sticky" top="0" zIndex="500" >
      <Navbar />
    </Box>
  );
};

export default Header;
