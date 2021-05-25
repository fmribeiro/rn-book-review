import { MaterialIcons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Button, SafeAreaView, View } from "react-native";

import Colors from "../constants/Colors";
import AddBookScreen, { addBookScreenOptions } from "../screens/addBook";
import AuthScreen, { authScreenOptions } from "../screens/authScreen";
import BooksScreen, { bookScreenOptions } from "../screens/booksScreen";
import AddEditReviewScreen, {
  AddEditReviewScreenOptions,
} from "../screens/addEditReviewScreen";
import ReviewDetailsScreen, {
  reviewsDetailsScreenOptions,
} from "../screens/ReviewDetailsScreen";
import ReviewScreen, { reviewsScreenOptions } from "../screens/reviewsScreen";
import SearchScreen, {
  searchScreenOptions,
} from "../screens/SearchReviewsScreen";
import UsersScreen, { userScreenOptions } from "../screens/usersScreen";
import * as authActions from "../store/actions/auth";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
  headerTitleStyle: {
    fontFamily: "roboto-bold",
  },
  headerBackTitleStyle: "roboto-regular",
  headerTintColor: Colors.primaryColorText,
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Autenticacao"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

const ReviewStackNavigator = createStackNavigator();

export const ReviewNavigator = () => {
  return (
    <ReviewStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ReviewStackNavigator.Screen
        name="Reviews"
        component={ReviewScreen}
        options={reviewsScreenOptions}
      />

      <ReviewStackNavigator.Screen
        name="ReviewDetails"
        component={ReviewDetailsScreen}
        options={reviewsDetailsScreenOptions}
      />

      <ReviewStackNavigator.Screen
        name="Search"
        component={SearchScreen}
        options={searchScreenOptions}
      />

      <ReviewStackNavigator.Screen
        name="AddEditReview"
        component={AddEditReviewScreen}
        options={AddEditReviewScreenOptions}
      />

      <BookStackNavigator.Screen
        name="AddBook"
        component={AddBookScreen}
        options={addBookScreenOptions}
      />
    </ReviewStackNavigator.Navigator>
  );
};

const searchReviewStackNavigator = createStackNavigator();

export const searchReviewNavigator = () => {
  return (
    <ReviewStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ReviewStackNavigator.Screen
        name="Search"
        component={SearchScreen}
        options={searchScreenOptions}
      />

      <ReviewStackNavigator.Screen
        name="ReviewDetails"
        component={ReviewDetailsScreen}
        options={reviewsDetailsScreenOptions}
      />
    </ReviewStackNavigator.Navigator>
  );
};

const BookStackNavigator = createStackNavigator();

export const BookNavigator = () => {
  return (
    <BookStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <BookStackNavigator.Screen
        name="Books"
        component={BooksScreen}
        options={bookScreenOptions}
      />

      <BookStackNavigator.Screen
        name="AddBook"
        component={AddBookScreen}
        options={addBookScreenOptions}
      />
    </BookStackNavigator.Navigator>
  );
};

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

const ReviewDrawerNavigator = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <ReviewDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView
              forceInset={{
                top: "always",
                horizontal: "never",
                paddingTop: 10,
              }}
            >
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primaryColorDark}
                onPress={() => {
                  dispatch(authActions.logout());
                  // props.navigation.navigate("Auth");
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primaryColorDark,
      }}
    >
      <ReviewDrawerNavigator.Screen
        name="Resenhas recentes"
        component={ReviewNavigator}
        color={Colors.primaryTextColor}
        options={{
          drawerIcon: (drawerConfig) => (
            <MaterialIcons
              name="rate-review"
              size={23}
              color={Colors.primaryColor}
            />
          ),
        }}
      />

      <ReviewDrawerNavigator.Screen
        name="Livros lidos"
        component={BookNavigator}
        color={Colors.primaryTextColor}
        options={{
          drawerIcon: (drawerConfig) => (
            <MaterialIcons name="book" size={23} color={Colors.primaryColor} />
          ),
        }}
      />

      <ReviewDrawerNavigator.Screen
        name="Busca"
        component={searchReviewNavigator}
        color={Colors.primaryTextColor}
        options={{
          drawerIcon: (drawerConfig) => (
            <MaterialIcons
              name="search"
              size={23}
              color={Colors.primaryColor}
            />
          ),
        }}
      />

      <ReviewDrawerNavigator.Screen
        name="Usuários"
        component={UserNavigator}
        color={Colors.primaryTextColor}
        options={{
          drawerIcon: (drawerConfig) => (
            <MaterialIcons
              name="people"
              size={23}
              color={Colors.primaryColor}
            />
          ),
        }}
      />
    </ReviewDrawerNavigator.Navigator>
  );
};
