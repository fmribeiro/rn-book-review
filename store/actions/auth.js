import AsyncStorage from "@react-native-async-storage/async-storage";
import { GOOGLE_API_KEY } from "../../data/environment";
import * as userActions from "./users";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AUTO_LOGIN = "SET_DID_TRY_AUTO_LOGIN";
export const RESET_PASSWORD = "RESET_PASSWORD";

let timer;

export const setDitTryAutoLogin = () => {
  return { type: SET_DID_TRY_AUTO_LOGIN };
};

export const logout = () => {
  return (dispatch) => {
    console.log("logout");
    dispatch(userActions.clearUserState());
    clearLogoutTimer();
    AsyncStorage.removeItem("userData");
    AsyncStorage.removeItem("loggedUser");
    dispatch({ type: LOGOUT });
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const authenticate = (userId, token, expiryTime, loggedUser) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId, token, loggedUser });
  };
};

export const signup = (email, password, name, nickname) => {
  return async (dispatch) => {
    let resData;
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong";
      if (errorId === "EMAIL_EXISTS") {
        message = "E-mail já cadastrado!";
      }
      throw new Error(message);
    } else {
      resData = await response.json();
      // console.log(`resData: ${JSON.stringify(resData)}`);
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);

      const user = { name, nickname, idToken: resData.localId };
      dispatch(userActions.saveUser(user, resData.idToken));

      dispatch(
        authenticate(
          resData.localId,
          resData.idToken,
          parseInt(resData.expiresIn) * 1000,
          { name, nickname, idToken: resData.idToken }
        )
      );
    }
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    let resData;
    const signInResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!signInResponse.ok) {
      const errorResData = await signInResponse.json();
      const errorId = errorResData.error.message;
      let message = "Algo deu errado!";

      if (errorId === "EMAIL_NOT_FOUND") {
        message = "E-mail não encontrado!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "Usuário ou senha inválidos";
      }

      throw new Error(message);
    } else {
      resData = await signInResponse.json();
      dispatch(userActions.getUser(resData.localId));

      dispatch(
        authenticate(
          resData.localId,
          resData.idToken,
          parseInt(resData.expiresIn) * 1000
        )
      );

      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
  };
};

export const deleteAccount = (idToken) => {
  return async (dispatch) => {
    let resData;
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Algo deu errado!";
      if (errorId === "INVALID_ID_TOKEN") {
        message = "token invalido";
      } else if (errorId === "USER_NOT_FOUND") {
        message = "usuario nao encontrado";
      }
      throw new Error(message);
    }

    dispatch(logout());
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    console.log("resetPassword");

    let resData;
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email,
        }),
      }
    );

    if (!response.ok) {
      resData = await response.json();
      console.log(JSON.stringify(resData));
      const errorId = resData.error.message;
      let message = "Algo deu errado!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "E-mail não encontrado";
      }
      throw new Error(message);
    } else {
      resData = await response.json();
      const { email } = resData;
      dispatch({ type: RESET_PASSWORD, email });
    }
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({ token, userId, expiryDate: expirationDate.toISOString() })
  );
};
