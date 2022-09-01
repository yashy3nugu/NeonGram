import React, { useEffect, useContext } from "react";
import { Redirect, Route, useRouteMatch } from "react-router-dom";
import { AuthContext } from "./authContext";
import LoginPage from "../Login/LoginPage";
import Header from "../header/header";
import SpinnerIcon from "../icons/SpinnerIcon";
import axiosInstance from '../../config/axios';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth, toggleAuth } = useContext(AuthContext);;

  useEffect(() => {
    

    axiosInstance
      .post(
        "/api/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        toggleAuth(res.data);
      })
      .catch((err) => {
        toggleAuth(false);
      });
  }, [toggleAuth]);

  if (auth === null) {
    return (
      <div className="relative">
        <div className="fixed top-50">
          <SpinnerIcon styles="block" enabled />
        </div>
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        !auth ? (
          // <LoginPage />
          <Redirect to="/login" />
        ) : (
          <>
            <Header />
            <Component {...props} />
          </>
        )
      }
    />
  );
};

export default PrivateRoute;
