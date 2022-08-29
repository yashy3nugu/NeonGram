import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const AppAlert = ({ details }) => {
  return (
    <Alert
    colorScheme="crimsonScheme"
      variant="solid"
      borderRadius="2px"
      pos="absolute"
      top={{
        xl: "8%",
        md: "6%",
        sm: "12%",
      }}
      m={{
        sm: "0 auto",
      }}
      zIndex="100"
      maxW={{
        md: "500px",
        sm: "100%",
      }}
      status={details.status}
    >
      <AlertIcon />
      <AlertTitle>{details.message}</AlertTitle>
    </Alert>
  );
};

export default AppAlert;
