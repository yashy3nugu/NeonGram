import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import SignUpPage from "./components/SignUp/SignUpPage";
import Feed from "./components/Feed/Feed";
import PrivateRoute from "./components/contextProviders/privateRoute";
import CreatePost from "./components/Post/CreatePost";
import UserPage from "./components/UserPage/UserPage";
import Settings from "./components/Settings/Settings";
import FindFollowers from "./components/Followers/FindFollowers";
import ExplorePage from "./components/Explore/ExplorePage";
import NotFound from "./components/NotFound/NotFound";
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
          <Switch>
            <Box h="100vh" maxHeight="100vh">
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
            </Box>
          </Switch>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
