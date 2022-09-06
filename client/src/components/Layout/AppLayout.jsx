import { Flex } from "@chakra-ui/react";
import Header from "./header/Header";

const AppLayout = ({ children }) => {
  return (
    <Flex direction="column" align="center" w="full" h="100vh" overflow="auto">
      <Header />
      {children}
    </Flex>
  );
};

export default AppLayout;
