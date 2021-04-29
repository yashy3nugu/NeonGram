import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header/header";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/SignUp/SignUpPage";

function App() {
  return (
    
    <>
    {/* <Header /> */}
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
    </>
  
    
  );
}

export default App;
