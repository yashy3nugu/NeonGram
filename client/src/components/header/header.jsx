import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "./navbar";

const Header = () => {
  return (
    <Box as="header" position="sticky" top={0} z="10" className="sticky top-0 z-10">
      <Navbar />
    </Box>
  );
};

export default Header;
