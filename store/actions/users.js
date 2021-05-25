import { User } from "../../models/User";
import { convertObjetIdToDate } from "../../utils/Utils";

export const GET_USERS = "GET_USERS";

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    console.log("fetchUsers");
    try {
      const response = await fetch(
        "https://whispering-springs-63743.herokuapp.com/book-review/users/page/0/size/10"
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      let resData = await response.json();
      resData = resData.users;
      const users = [];
      //   console.log(resData);

      for (const key in resData) {
        users.push(
          new User(
            resData[key].id,
            resData[key].name,
            resData[key].nickname,
            null,
            convertObjetIdToDate(resData[key].id),
            resData[key].usersFollowing,
            resData[key].books,
            resData[key].reviews
          )
        );
      }
      // console.log(`fetch reviews${JSON.stringify(reviews)}`);
      dispatch({
        type: GET_USERS,
        users: users,
      });
    } catch (error) {
      throw error;
    }
  };
};
