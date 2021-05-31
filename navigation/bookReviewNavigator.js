import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { Button, Image, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";

import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import AddBookScreen, { addBookScreenOptions } from "../screens/addBook";
import AddEditReviewScreen, {
  AddEditReviewScreenOptions,
} from "../screens/addEditReviewScreen";
import AuthScreen, { authScreenOptions } from "../screens/authScreen";
import BooksScreen, { bookScreenOptions } from "../screens/booksScreen";
import ForgotPasswordScreen, {
  forgotPasswordScreenOptions,
} from "../screens/forgotPasswordScreen";
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

const getLoggedUser = async () => {
  const loggedUser = await AsyncStorage.getItem("loggedUser");
  return loggedUser;
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

      <AuthStackNavigator.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={forgotPasswordScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

const ReviewStackNavigator = createStackNavigator();

export const ReviewNavigator = (props) => {
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
        name="AddEditReview"
        component={AddEditReviewScreen}
        options={AddEditReviewScreenOptions}
      />

      <ReviewStackNavigator.Screen
        name="Search"
        component={SearchScreen}
        options={searchScreenOptions}
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

export const DrawerNavigator = (props) => {
  const dispatch = useDispatch();
  const loggedUser = props.user;
  const isAuth = props.isAuth;

  return (
    <ReviewDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            {isAuth && loggedUser && (
              <View style={{ backgroundColor: Colors.primaryColorDark }}>
                <Image
                  style={{
                    width: 75,
                    height: 75,
                    margin: 5,
                    borderRadius: 100,
                    marginTop: 10,
                  }}
                  source={{
                    uri: "https://images.unsplash.com/photo-1621803495185-208bdf587f80?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
                  }}
                />
                <CustomText
                  style={{
                    fontFamily: "roboto-bold",
                    marginLeft: 10,
                    fontSize: 18,
                    color: Colors.primaryColorText,
                  }}
                >
                  {loggedUser.name}
                </CustomText>
                <CustomText
                  style={{
                    fontFamily: "roboto-bold",
                    marginLeft: 10,
                    marginBottom: 10,
                    color: Colors.primaryColorText,
                  }}
                >
                  @{loggedUser.nickname}
                </CustomText>
              </View>
            )}

            <SafeAreaView
              forceInset={{
                top: "always",
                horizontal: "never",
                paddingTop: 10,
              }}
            >
              <DrawerItemList {...props} />
              <View
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  color: Colors.primaryColor,
                }}
              >
                <Button
                  title="Sair"
                  onPress={() => {
                    dispatch(authActions.logout());
                  }}
                  color={Colors.primaryColor}
                />
              </View>
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
        initialParams={loggedUser}
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
