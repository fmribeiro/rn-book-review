import { GET_USERS } from "../actions/users";

const initialState = {
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        users: action.users,
      };
  }
  return state;
};
