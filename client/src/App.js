import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Router>
          <Switch>
            <Box h="100vh">
            <PrivateRoute exact path="/" component={Feed} />
            <PrivateRoute exact path="/post" component={CreatePost} />
            <PrivateRoute exact path="/user/:user" component={UserPage} />
            <PrivateRoute exact path="/settings" component={Settings} />
            <PrivateRoute exact path="/find" component={FindFollowers} />
            <PrivateRoute exact path="/explore" component={ExplorePage} />
            <Route exact path="/signup">
              <SignUpPage />
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
