import React, { useEffect, useContext} from 'react';
import { Route } from 'react-router-dom'
import axios from "axios";
import {AuthContext} from "./authContext";
import LoginPage from "../Login/LoginPage";


const PrivateRoute = ({ component: Component, ...rest }) => {

  
  const { auth, toggleAuth } = useContext(AuthContext);
  
    
  useEffect(() => {

    axios.post("/api/verify",{},{headers: {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
  }} ).then(res => {
      toggleAuth(res.data);
  })
  .catch(err => {
    toggleAuth(false);
  })
    
    
  }, [toggleAuth])

  if(auth === null){
    return <h1>Loading</h1>
  }

  return (
    <Route {...rest} render={props =>
      !auth ? (
        <LoginPage/>
      ) : (
        <Component {...props} />
      )
    }
    />
  );
};

export default PrivateRoute;