import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/SignUp/SignUpPage";
import Home from "./components/Home";
import PrivateRoute from "./components/contextProviders/privateRoute";

function App() {


  // const { auth, toggleAuth } = useContext(AuthContext);

  // useEffect(() => {

  //   axios.post("/api/verify", {}, {
  //     headers: {
  //       "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
  //     }


  //   })
  //     .then(res => toggleAuth(true))
  //     .catch(err => toggleAuth(false))

    

  // }, [toggleAuth])

  return (

    <>
      <Router>
        <Switch>
          {/* <Route exact path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute exact path="/home" component={Home} />
          <Route exact path="/signup">
            <SignUpPage />
          </Route> */}
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </Router>


    </>


  );
}

export default App;
