import React, { useState, useContext } from "react";
import NeonGramIcon from "../icons/NeonGramIcon";

import { useLocation } from "react-router-dom";
import { AuthContext } from "../contextProviders/authContext";

import {
  Box,
  Flex,
  Text,
  HStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import NavLink from "./NavLink";

import Avatarmenu from "./AvatarMenu";
import Hidden from "../shared/Hidden";
import MenuIcon from "../icons/MenuIcon";
import MobileDrawer from "./MobileDrawer";

const Navbar = () => {
  const { auth } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const links = [
    {
      label: "Feed",
      url: "/",
    },
    {
      label: "Explore",
      url: "/explore",
    },
    {
      label: "Post",
      url: "/post",
    },
  ];

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        py={8}
        px={12}
        bg="primary.900"
        className="flex items-center justify-between w-full py-8 px-3 bg-gray-900"
      >
        <MobileDrawer isOpen={isOpen} onClose={onClose} />
        {/* <h1 className="logo">Neongram</h1> */}
        <Text as="a" href="/" className="ml-10">
          <NeonGramIcon />
        </Text>

        <Hidden hide={{ sm: true, md: true }}>
          <Box as="nav">
            <HStack as="ul" gap={3}>
              {links.map(({ url, label }, index) => {
                return <NavLink key={index} url={url} label={label} />;
              })}
              <Box>
                <Avatarmenu auth={auth} />
              </Box>
            </HStack>
          </Box>
        </Hidden>

        <IconButton
          variant="ghost"
          aria-label="Hamburger Menu"
          cursor="pointer"
          _focus={{
            outline: "none",
          }}
          display={{
            sm: "block",
            md: "block",
            lg: "none",
            xl: "none",
          }}
          onClick={onOpen}
          icon={<MenuIcon boxSize={6} />}
        />
      </Flex>
    </>
  );
};

export default Navbar;
