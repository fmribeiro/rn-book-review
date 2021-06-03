import { GET_USER, GET_USERS } from "../actions/users";

const initialState = {
  users: [],
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case GET_USER:
      // console.log(`REDUCER GET_USER: ${JSON.stringify(action.user)}`);
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
