import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthProvider from "./components/contextProviders/authContext";
import Header from "./components/header/header";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/SignUp/SignUpPage";

function App() {
  return (

    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/signup">
              <SignUpPage />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </>


  );
}

export default App;
