import { IconButton } from "@chakra-ui/react";
const ColoredFormIconButton = ({ children, ...props }) => {
  return (
    <IconButton
      colorScheme="tertiaryScheme"
      variant="solid"
      color="white"
      {...props}
    >
      {children}
    </IconButton>
  );
};

export default ColoredFormIconButton;
