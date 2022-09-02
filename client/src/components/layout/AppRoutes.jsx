import Feed from "../Feed/Feed";
import CreatePost from "../Post/CreatePost";
import UserPage from "../UserPage/UserPage";
import Settings from "../Settings/Settings";
import FindFollowers from "../Followers/FindFollowers";
import ExplorePage from "../Explore/ExplorePage";
import { useContext, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { AuthContext } from "../contextProviders/authContext";
import AppLayout from "./AppLayout";
import axiosInstance from "../../config/axios";
import { Route, Redirect } from "react-router-dom";

const AppRoutes = () => {
  const { auth, toggleAuth } = useContext(AuthContext);


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

  const route = useRouteMatch();

  if (auth === null) {
    return (
      <div className="relative">
        <div className="fixed top-50"></div>
      </div>
    );
  } else if (auth === false) {
    return <Redirect to="/login" />;
  }

  // returns these components only when authenticated
  return (
    <AppLayout>
      <Route exact path={`${route.url}/feed`} component={Feed} />
      <Route exact path={`${route.url}/post`} component={CreatePost} />
      <Route exact path={`${route.url}/user/:user`} component={UserPage} />
      <Route exact path={`${route.url}/settings`} component={Settings} />
      <Route exact path={`${route.url}/find`} component={FindFollowers} />
      <Route exact path={`${route.url}/explore`} component={ExplorePage} />
    </AppLayout>
  );
};

export default AppRoutes;
