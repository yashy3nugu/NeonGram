import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUpPage from "./components/SignUp/SignUpPage";

import { Box, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./config/themeconfig";
import LoginPage from "./components/Login/LoginPage";
import AppRoutes from "./components/layout/AppRoutes";

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Router>
          <Box h="100vh" maxHeight="100vh">
            <Switch>
              <Route path="/app">
                <AppRoutes />
              </Route>

              <Route exact path="/signup">
                <SignUpPage />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>

              {/* <Route component={NotFound} /> */}
            </Switch>
          </Box>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
