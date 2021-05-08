import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUpPage from "./components/SignUp/SignUpPage";
import Home from "./components/Home/Home";
import PrivateRoute from "./components/contextProviders/privateRoute";
import CreatePost from "./components/Post/CreatePost";
import UserPage from "./components/user/UserPage";

function App() {


  return (

    <>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/post" component={CreatePost} />
          <PrivateRoute exact path="/:user" component={UserPage} />
          <Route exact path = "/signup">
            <SignUpPage />
          </Route>
        </Switch>
      </Router>


    </>


  );
}

export default App;
