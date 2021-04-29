import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header/header";
import LoginPage from "./components/Login/LoginPage";

function App() {
  return (
    
    <>
    {/* <Header /> */}
    <Router>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
    </>
  
    
  );
}

export default App;
