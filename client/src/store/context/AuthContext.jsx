import React, { createContext, useReducer } from "react";
import reducer, { initialState } from "../reducers/AuthReducer";
import * as actionTypes from "../actionTypes";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // const [auth, toggleAuth] = useState(null);

  const [authState, dispatch] = useReducer(reducer, initialState);

  const setUser = (user) => {
    dispatch({
      type: actionTypes.SET_USER,
      user,
    });
  };

  const addFollowing = (followingId) => {
    dispatch({
      type: actionTypes.ADD_FOLLOWING,
      followingId,
    });
  };

  const removeFollowing = (followingId) => {
    dispatch({
      type: actionTypes.REMOVE_FOLLOWING,
      followingId,
    });
  };

  const updateUserDetails = (values) => {
    dispatch({
      type: actionTypes.UPDATE_USER_DETAILS,
      values,
    });
  };

  const removeProfilePicture = () => {
    dispatch({
      type: actionTypes.REMOVE_PROFILE_PICTURE,
    });
  };

  const addProfilePicture = (profilePicture) => {
    dispatch({
      type: actionTypes.ADD_PROFILE_PICTURE,
      profilePicture,
    });
  };

  const methods = {
    setUser,
    addFollowing,
    updateUserDetails,
    removeProfilePicture,
    addProfilePicture,
    removeFollowing,
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        ...methods,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContextProvider;

export { AuthContext };
