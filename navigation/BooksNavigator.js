import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import Colors from "../constants/Colors";

import AddBookScreen, { addBookScreenOptions } from "../screens/addBook";
import BooksScreen, { booksOptions } from "../screens/booksScreen";
import UserBooksScreen, { userBooksOptions } from "../screens/userBooksScreen";
import { defaultNavOptions } from "./defaultNavOptions";

const BookStackNavigator = createStackNavigator();

export const BookNavigator = () => {
  return (
    <BookStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <BookStackNavigator.Screen
        name="Books"
        component={BooksScreen}
        options={booksOptions}
      />

      <BookStackNavigator.Screen
        name="AddBook"
        component={AddBookScreen}
        options={addBookScreenOptions}
      />
    </BookStackNavigator.Navigator>
  );
};

const LoggedUserBookStackNavigator = createStackNavigator();

export const UserBooksNavigator = () => {
  return (
    <LoggedUserBookStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <LoggedUserBookStackNavigator.Screen
        name="UserBooks"
        component={UserBooksScreen}
        options={userBooksOptions}
      />

      <LoggedUserBookStackNavigator.Screen
        name="AddBook"
        component={AddBookScreen}
        options={addBookScreenOptions}
      />
    </LoggedUserBookStackNavigator.Navigator>
  );
};
