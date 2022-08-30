import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "./navbar";

const Header = () => {
  return (
    <Box bg="primary.900" as="header" pos="sticky" top={0} z="100" className="sticky top-0 z-10">
      <Navbar />
    </Box>
  );
};

export default Header;
