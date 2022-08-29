import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  VStack,
  DrawerBody,
  Divider,
  DrawerHeader,
  Box,
  Button,
  Flex,
  Text,
  Avatar,
  Center,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
import React, { useContext } from "react";
// import ThemeToggler from "../../components/ThemeToggler/ThemeToggler";
import { AuthContext } from "../contextProviders/authContext";
import SearchIcon from "../icons/SearchIcon";
import SettingsIcon from "../icons/SettingsIcon";
import UserIcon from "../icons/UserIcon";
import MobileDrawerLink from "./MobileDrawerLink";
// import NavItem from "./NavItem";

const MobileDrawer = ({ isOpen, onClose }) => {
  const { auth } = useContext(AuthContext);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="primary.800">
          <DrawerCloseButton />

          <DrawerBody justifyItems="start">
            <VStack align="stretch">
              <DrawerHeader>
                <LinkBox>
                  <Center>
                    <VStack>
                      <Avatar src={auth.profilePicture} size="md" />
                      <LinkOverlay href={`/user/${auth.username}`}>
                        {auth.username}
                      </LinkOverlay>
                    </VStack>
                  </Center>
                </LinkBox>
              </DrawerHeader>

              <Divider />
              <MobileDrawerLink
                onClose={onClose}
                to={`/user/${auth.username}`}
                icon={<UserIcon boxSize={5} />}
              >
                Account
              </MobileDrawerLink>

              <MobileDrawerLink
                onClose={onClose}
                to="/settings"
                icon={<SettingsIcon boxSize={5} />}
              >
                Settings
              </MobileDrawerLink>
              <MobileDrawerLink
                onClose={onClose}
                to="/find"
                icon={<SearchIcon boxSize={5} />}
              >
                Search
              </MobileDrawerLink>

              <Divider />

              <MobileDrawerLink onClose={onClose} to="/">
                Feed
              </MobileDrawerLink>

              <MobileDrawerLink onClose={onClose} to="/explore">
                Explore
              </MobileDrawerLink>

              <MobileDrawerLink onClose={onClose} to="/post">
                Post
              </MobileDrawerLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default MobileDrawer;
