import Feed from "../Feed/Feed";
import CreatePost from "../Post/CreatePost";
import UserPage from "../UserPage/UserPage";
import Settings from "../Settings/Settings";
import Search from "../Followers/Search";
import ExplorePage from "../Explore/ExplorePage";
import { useContext, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { AuthContext } from "../../store/context/AuthContext";
import AppLayout from "./AppLayout";
import axiosInstance from "../../config/axios";
import { Route, Redirect } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";

const AppRoutes = () => {
  const { user, setUser } = useContext(AuthContext);

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
        setUser(res.data);
      })
      .catch((err) => {
        setUser(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const route = useRouteMatch();

  if (user == null) {
    return (
      <Center height="100vh" >
        <Spinner thickness="4px" color="tertiary" size="xl" />
      </Center>
    );
  } else if (user === false) {
    return <Redirect to="/login" />;
  }

  // returns these components only when authenticated
  return (
    <AppLayout>
      <Route exact path={`${route.url}/feed`} component={Feed} />
      <Route exact path={`${route.url}/post`} component={CreatePost} />
      <Route exact path={`${route.url}/user/:user`} component={UserPage} />
      <Route exact path={`${route.url}/settings`} component={Settings} />
      <Route exact path={`${route.url}/find`} component={Search} />
      <Route exact path={`${route.url}/explore`} component={ExplorePage} />
    </AppLayout>
  );
};

export default AppRoutes;
