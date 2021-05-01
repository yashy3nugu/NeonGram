import React, { useEffect, useContext} from 'react';
import { Route, Redirect } from 'react-router-dom'
import axios from "axios";
import {AuthContext} from "./authContext";


const PrivateRoute = ({ component: Component, ...rest }) => {

  
  const { auth, toggleAuth } = useContext(AuthContext);
  
    
  useEffect(() => {

    axios.post("/api/verify",{},{headers: {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
  }} ).then(res => {
      toggleAuth(true);
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
        <Redirect to='/login'/>
      ) : (
        <Component {...props} />
      )
    }
    />
  );
};

export default PrivateRoute;