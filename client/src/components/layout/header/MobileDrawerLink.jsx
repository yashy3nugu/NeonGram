import { Button, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const MobileDrawerLink = ({ onClose, to, children, icon }) => {
  return (
    <Box display="inline-block" as="li">
      <Button
        onClick={onClose}
        bg="transparent"
        size="sm"
        outline="none"
        
        _hover={{
          bg: "transparent",
        }}
        
        _focus={{
          outline: "none",
        }}
        _active={{
          bg: "transparent",
        }}
        to={to}
        as={NavLink}
        leftIcon={icon}
        
      >
       {children}
      </Button>
    </Box>
  );
};

export default MobileDrawerLink;
