import { Menu, Avatar, Button, MenuList, VStack, MenuButton, MenuItem } from "@chakra-ui/react"
import UserIcon from "../icons/UserIcon"
import SettingsIcon from "../icons/SettingsIcon"
import SearchIcon from "../icons/SearchIcon"
import {NavLink as RouterNavLink} from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../contextProviders/authContext"

const Avatarmenu = () => {
    const { auth } = useContext(AuthContext)
    return (
        <Menu>
              <MenuButton
                _focus={{
                  outline: "none",
                }}
                as={Button}
                variant="text"
              >
                <Avatar src={auth.profilePicture} size="sm" />
              </MenuButton>
              <MenuList bg="primary.800">
                <VStack align="left">
                  <MenuItem icon={<UserIcon boxSize={5} />} as={RouterNavLink} to={`/app/user/${auth.username}`}>Profile</MenuItem>
                  <MenuItem icon={<SettingsIcon boxSize={5} />} as={RouterNavLink} to="/app/settings">Settings</MenuItem>
                  <MenuItem icon={<SearchIcon boxSize={5} />} as={RouterNavLink} to="/app/find">Search</MenuItem>

                </VStack>
              </MenuList>
            </Menu>
    )
}

export default Avatarmenu;