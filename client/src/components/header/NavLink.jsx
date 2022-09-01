import { IconButton, Tooltip, Link, Button } from "@chakra-ui/react";
import { NavLink as RouterNavLink } from "react-router-dom";

const NavLink = ({ icon, label, url }) => {
  return (
    <Button as={RouterNavLink} to={url} variant="ghost">
      {label}
    </Button>
  );
};
export default NavLink;
