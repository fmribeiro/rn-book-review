import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { DrawerNavigator } from "../navigation/MainNavigator";
import StartupScreen from "../screens/startupScreen";
import { PageContext } from "../utils/page-context";
import { AuthNavigator } from "./AuthNavigator";

const AppNavigator = (props) => {
  // const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.users.user);
  const authentication = useSelector((state) => state.auth);
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => !!state.auth.didTryAutoLogin);
  const [loggedUser, setLoggedUser] = useState({ user, authentication });

  console.log(`isAuth: ${JSON.stringify(isAuth)}`);
  console.log(`currentUser: ${JSON.stringify(loggedUser)}`);

  return (
    //PageContext cria um contexto global que pode ser usado por toda aplicacao
    // const [loggedUser] = useContext(PageContext);
    <PageContext.Provider value={[loggedUser, setLoggedUser]}>
      <NavigationContainer>
        {isAuth && <DrawerNavigator user={loggedUser.user} isAuth={isAuth} />}
        {!isAuth && didTryAutoLogin && <AuthNavigator />}
        {!isAuth && !didTryAutoLogin && <StartupScreen />}
      </NavigationContainer>
    </PageContext.Provider>
  );
};

export default AppNavigator;
