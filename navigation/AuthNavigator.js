import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";

import AuthScreen, { authScreenOptions } from "../screens/authScreen";
import ForgotPasswordScreen, {
  forgotPasswordScreenOptions,
} from "../screens/forgotPasswordScreen";
import { defaultNavOptions } from "./defaultNavOptions";

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Autenticacao"
        component={AuthScreen}
        options={authScreenOptions}
      />

      <AuthStackNavigator.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={forgotPasswordScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
