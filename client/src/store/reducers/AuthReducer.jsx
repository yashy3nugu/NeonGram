import * as actionTypes from "../actionTypes";

export const initialState = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.ADD_FOLLOWING:
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.followingId],
        },
      };
    case actionTypes.REMOVE_FOLLOWING:
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            (followingId) => followingId !== action.followingId
          ),
        },
      };
    case actionTypes.UPDATE_USER_DETAILS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.values,
        },
      };
    case actionTypes.REMOVE_PROFILE_PICTURE:
      return {
        user: {
          ...state.user,
          profilePicture: null,
        },
      };
    case actionTypes.ADD_PROFILE_PICTURE:
      return {
        user: {
          ...state.user,
          profilePicture: action.profilePicture,
        },
      };
    case actionTypes.LOGOUT:
      return {
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
