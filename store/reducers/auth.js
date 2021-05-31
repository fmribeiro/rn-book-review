import {
  AUTHENTICATE,
  LOGOUT,
  RESET_PASSWORD,
  SET_DID_TRY_AUTO_LOGIN,
} from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
  loggedUser: null,
  email: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
        loggedUser: action.loggedUser,
      };

    case SET_DID_TRY_AUTO_LOGIN:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return { ...initialState, didTryAutoLogin: true };
    case RESET_PASSWORD:
      return { email: action.email };
    default:
      return state;
  }
};
