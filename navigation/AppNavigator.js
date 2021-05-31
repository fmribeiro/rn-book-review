import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  AuthNavigator,
  DrawerNavigator,
} from "../navigation/bookReviewNavigator";
import StartupScreen from "../screens/startupScreen";
import { getCurrentUser } from "../utils/Utils";

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const currentUser = useSelector((state) => state.users.user);
  const didTryAutoLogin = useSelector((state) => !!state.auth.didTryAutoLogin);
  // const [loggedUser, setLoggedUser] = useState(currentUser);

  console.log(`isAuth: ${JSON.stringify(isAuth)}`);
  // console.log(`loggedUserBefore: ${JSON.stringify(loggedUser)}`);
  console.log(`currentUser: ${JSON.stringify(currentUser)}`);

  // const getLoggedUser = useCallback(async () => {
  //   await getCurrentUser().then((user) => {
  //     if (isAuth) {
  //       const { name, nickname, idToken } = currentUser;
  //       setLoggedUser({ name, nickname, idToken });
  //       console.log(`setLoggedUser: ${JSON.stringify(loggedUser)}`);
  //     } else {
  //       setLoggedUser({});
  //     }
  //   });
  // }, [setLoggedUser, isAuth]);

  // useEffect(() => {
  //   getLoggedUser();
  // }, [setLoggedUser]);

  return (
    //PageContext cria um contexto global que pode ser usado por toda aplicacao
    // const [loggedUser] = useContext(PageContext);
    // <PageContext.Provider value={[loggedUser, setLoggedUser]}>
    <NavigationContainer>
      {isAuth && <DrawerNavigator user={currentUser} isAuth={isAuth} />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
    // </PageContext.Provider>
  );
};

export default AppNavigator;
