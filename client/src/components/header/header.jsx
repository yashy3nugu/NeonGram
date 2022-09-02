import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "./navbar";

const Header = () => {
  return (
    <Box w="full" bg="primary.900" as="header" position="sticky" top="0" zIndex="500" className="sticky top-0 z-10">
      <Navbar />
    </Box>
  );
};

export default Header;
