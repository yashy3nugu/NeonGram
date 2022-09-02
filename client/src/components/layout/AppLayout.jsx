import { Flex } from "@chakra-ui/react";
import Header from "../header/header";

const AppLayout = ({ children }) => {
  return (
    <Flex direction="column" align="center" w="full" h="100vh">
      <Header />
      {children}
    </Flex>
  );
};

export default AppLayout;
