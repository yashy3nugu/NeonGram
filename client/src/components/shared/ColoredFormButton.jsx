import { Button } from "@chakra-ui/react";
const ColoredFormButton = ({ children, ...props }) => {
  return (
    <Button
      variantColor="tertiaryScheme"
      variant="solid"
      color="white"
      {...props}
    >
      {children}
    </Button>
  );
};

export default ColoredFormButton;
