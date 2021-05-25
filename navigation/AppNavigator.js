import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import {
  AuthNavigator,
  DrawerNavigator,
} from "../navigation/bookReviewNavigator";
import StartupScreen from "../screens/startupScreen";

const AppStack = createStackNavigator();

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => !!state.auth.didTryAutoLogin);
  console.log(`isAuth: ${isAuth}`);
  console.log(`didTryAutoLogin: ${didTryAutoLogin}`);

  return (
    <NavigationContainer>
      {isAuth && <DrawerNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;

// {!isAuth && !didTryAutoLogin && <StartupScreen />}
