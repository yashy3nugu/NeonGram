import { Button } from "@chakra-ui/react";
const ColoredFormButton = ({ children, ...props }) => {
  return (
    <Button
      colorScheme="tertiaryScheme"
      variant="solid"
      color="white"
      {...props}
    >
      {children}
    </Button>
  );
};

export default ColoredFormButton;
