import React, { useContext } from "react";
import NeonGramIcon from "../../Shared/icons/NeonGramIcon";

import { AuthContext } from "../../ContextProviders/AuthContext";

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
import Hidden from "../../Shared/ui/Hidden";
import MenuIcon from "../../Shared/icons/MenuIcon";
import MobileDrawer from "./MobileDrawer";

const Navbar = () => {
  const { auth } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const links = [
    {
      label: "Feed",
      url: "/app/feed",
    },
    {
      label: "Explore",
      url: "/app/explore",
    },
    {
      label: "Post",
      url: "/app/post",
    },
  ];

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        py={8}
        px={{ base: 6, md: 12 }}
        bg="primary.900"
        className="flex items-center justify-between w-full py-8 px-3 bg-gray-900"
      >
        <MobileDrawer isOpen={isOpen} onClose={onClose} />

        <Text as="a" href="/app/feed" className="ml-10">
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
