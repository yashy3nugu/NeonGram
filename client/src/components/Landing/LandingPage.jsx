import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axiosInstance from "../../config/axios";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

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
      .then(() => {
        setLoggedIn(true);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  });

  if (loading) {
    return <></>;
  }

  if (loggedIn) {
    return <Redirect to="/app/feed" />;
  }

  return <>Add landing page here</>;
};

export default LandingPage;
