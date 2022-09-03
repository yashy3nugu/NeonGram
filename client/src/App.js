import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUpPage from "./components/SignUp/SignUpPage";
import AuthProvider from "./components/ContextProviders/AuthContext";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./config/themeconfig";
import LoginPage from "./components/Login/LoginPage";
import AppRoutes from "./components/Layout/AppRoutes";

function App() {
  return (
    <>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Router>
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
          </Router>
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}

export default App;
