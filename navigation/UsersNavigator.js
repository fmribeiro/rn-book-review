import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";

import UsersFollowingScreen, {
  usersFollowingScreenOptions,
} from "../screens/usersFollowingScreen";
import UsersScreen, { userScreenOptions } from "../screens/usersScreen";
import { defaultNavOptions } from "./defaultNavOptions";

const UserStackNavigator = createStackNavigator();

export const UserNavigator = () => {
  return (
    <UserStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <UserStackNavigator.Screen
        name="Usuarios"
        component={UsersScreen}
        options={userScreenOptions}
      />
    </UserStackNavigator.Navigator>
  );
};

const LoggedUserStackNavigator = createStackNavigator();
export const UsersFollowingNavigator = () => {
  return (
    <LoggedUserStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <LoggedUserStackNavigator.Screen
        name="UsersFollowing"
        component={UsersFollowingScreen}
        options={usersFollowingScreenOptions}
      />
    </LoggedUserStackNavigator.Navigator>
  );
};
