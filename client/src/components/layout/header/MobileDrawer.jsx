import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  VStack,
  DrawerBody,
  Divider,
  DrawerHeader,
  Avatar,
  Center,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
import React, { useContext } from "react";
// import ThemeToggler from "../../components/ThemeToggler/ThemeToggler";
import { AuthContext } from "../../ContextProviders/AuthContext";
import SearchIcon from "../../Shared/icons/SearchIcon";
import SettingsIcon from "../../Shared/icons/SettingsIcon";
import UserIcon from "../../Shared/icons/UserIcon";
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
                      <LinkOverlay href={`/app/user/${auth.username}`}>
                        {auth.username}
                      </LinkOverlay>
                    </VStack>
                  </Center>
                </LinkBox>
              </DrawerHeader>

              <Divider />
              <MobileDrawerLink
                onClose={onClose}
                to={`/app/user/${auth.username}`}
                icon={<UserIcon boxSize={5} />}
              >
                Account
              </MobileDrawerLink>

              <MobileDrawerLink
                onClose={onClose}
                to="/app/settings"
                icon={<SettingsIcon boxSize={5} />}
              >
                Settings
              </MobileDrawerLink>
              <MobileDrawerLink
                onClose={onClose}
                to="/app/find"
                icon={<SearchIcon boxSize={5} />}
              >
                Search
              </MobileDrawerLink>

              <Divider />

              <MobileDrawerLink onClose={onClose} to="/app/feed">
                Feed
              </MobileDrawerLink>

              <MobileDrawerLink onClose={onClose} to="/app/explore">
                Explore
              </MobileDrawerLink>

              <MobileDrawerLink onClose={onClose} to="/app/post">
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
