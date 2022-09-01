import PrivateRoute from "../contextProviders/privateRoute";
import Feed from "../Feed/Feed";
import CreatePost from "../Post/CreatePost";
import UserPage from "../UserPage/UserPage";
import Settings from "../Settings/Settings";
import FindFollowers from "../Followers/FindFollowers";
import ExplorePage from "../Explore/ExplorePage";

import { useRouteMatch } from "react-router-dom";

const AppRoutes = () => {
  const route = useRouteMatch();

  return (
    <>
      <PrivateRoute exact path={`${route.url}/feed`} component={Feed} />
      <PrivateRoute exact path={`${route.url}/post`} component={CreatePost} />
      <PrivateRoute exact path={`${route.url}/user/:user`} component={UserPage} />
      <PrivateRoute exact path={`${route.url}/settings`} component={Settings} />
      <PrivateRoute exact path={`${route.url}/find`} component={FindFollowers} />
      <PrivateRoute exact path={`${route.url}/explore`} component={ExplorePage} />
    </>
  );
};

export default AppRoutes;
