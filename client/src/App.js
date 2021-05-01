import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUpPage from "./components/SignUp/SignUpPage";
import Home from "./components/Home";
import PrivateRoute from "./components/contextProviders/privateRoute";

function App() {


  return (

    <>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path = "/signup">
            <SignUpPage />
          </Route>
        </Switch>
      </Router>


    </>


  );
}

export default App;
