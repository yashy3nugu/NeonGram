import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUpPage from "./components/SignUp/SignUpPage";
import AuthContextProvider from "./store/context/AuthContext";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./config/themeconfig";
import LoginPage from "./components/Login/LoginPage";
import AppRoutes from "./components/Layout/AppRoutes";
import LandingPage from "./components/Landing/LandingPage";

function App() {
  return (
    <>
      <AuthContextProvider>
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

              <Route exact path="/">
                <LandingPage />
              </Route>

              
            </Switch>
          </Router>
        </ChakraProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
