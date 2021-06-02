import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../models/User";
import { convertObjetIdToDate } from "../../utils/Utils";

export const GET_USERS = "GET_USERS";
export const GET_USER = "GET_USER";

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

      dispatch({
        type: GET_USERS,
        users: users.sort((user) => user.books),
      });
    } catch (error) {
      throw error;
    }
  };
};

export const fetchFollowingUsers = (userId, token) => {
  return async (dispatch, getState) => {
    console.log("fetchFollowingUsers");
    try {
      const response = await fetch(
        `https://whispering-springs-63743.herokuapp.com/book-review/users/following/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        console.log(response);
        dispatch({
          type: GET_USERS,
          users: [],
        });
        throw new Error("something went wrong");
      }
      {
        // console.log(`response: ${JSON.stringify(response)}`);
        let resData = await response.json();
        // console.log(`response: ${JSON.stringify(resData)}`);
        const users = [];

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
        dispatch({
          type: GET_USERS,
          users: users.sort((user) => user.books),
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

export const saveUser = (user, token) => {
  return async (dispatch, getState) => {
    console.log("saveUser");

    try {
      const { name, nickname, idToken } = user;

      const saveNewUser = await fetch(
        "https://whispering-springs-63743.herokuapp.com/book-review/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, nickname, idToken }),
        }
      );

      if (!saveNewUser.ok) {
        throw new Error("something went wrong");
      } else {
        const saveNewUserResponse = await saveNewUser.json();
        // const { id, name, nickname, idToken } = response;
        saveUserInfoToStorage(saveNewUserResponse);

        dispatch({
          type: GET_USER,
          user: { name, nickname, idToken },
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

export const getUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://whispering-springs-63743.herokuapp.com/book-review/users/idToken/${userId}`
      );

      if (!response.ok) {
        dispatch({
          type: GET_USER,
          user: {},
        });
        throw new Error("something went wrong");
      } else {
        const loggedUser = await response.json();
        saveUserInfoToStorage(loggedUser);

        const user = new User(
          loggedUser.id,
          loggedUser.name,
          loggedUser.nickname,
          loggedUser.idToken,
          null,
          null,
          null,
          null
        );

        console.log(`dispatchUser: ${JSON.stringify(user)}`);
        dispatch({
          type: GET_USER,
          user: user,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

const saveUserInfoToStorage = (user) => {
  AsyncStorage.setItem(
    "loggedUser",
    JSON.stringify({
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      idToken: user.idToken,
    })
  );
};
