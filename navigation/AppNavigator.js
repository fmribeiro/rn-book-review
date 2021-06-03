import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { DrawerNavigator } from "../navigation/MainNavigator";
import StartupScreen from "../screens/startupScreen";
import { PageContext } from "../utils/page-context";
import { AuthNavigator } from "./AuthNavigator";

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const [loggedUser, setLoggedUser] = useState({});

  //informacoes do usuario: nome, email
  const users = useSelector((state) => state.users);
  const [user, setUser] = useState(users?.user);
  useEffect(() => {
    setUser(users?.user);
  }, [users]);

  //informacoes da autenticacao no firebase: token
  const authentication = useSelector((state) => state.auth);
  const [authInfo, setAuthInfo] = useState(authentication?.token);
  useEffect(() => {
    setAuthInfo(authentication?.token);
  }, [authentication]);

  useEffect(() => {
    setLoggedUser({ user, authentication: authInfo });
  }, [user, authInfo]);

  const didTryAutoLogin = useSelector((state) => !!state.auth.didTryAutoLogin);

  console.log(`isAuth: ${JSON.stringify(isAuth)}`);
  console.log(`loggedUser: ${JSON.stringify(loggedUser)}`);
  // console.log(`currentUser: ${JSON.stringify(users.user)}`);

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
