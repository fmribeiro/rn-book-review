import { MaterialIcons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { useState } from "react";
import { Button, Image, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";

import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";
import { UserBooksNavigator } from "./BooksNavigator";
import { MyReviewsNavigator, searchReviewNavigator } from "./ReviewsNavigator";
import BottomTabs from "./TabNavigator";
import { UsersFollowingNavigator } from "./UsersNavigator";

const ReviewDrawerNavigator = createDrawerNavigator();

export const DrawerNavigator = (props) => {
  const dispatch = useDispatch();
  const loggedUser = props.user;
  const isUserAuthenticated = props.isAuth;

  return (
    <ReviewDrawerNavigator.Navigator
      drawerStyle={{
        backgroundColor: Colors.primaryColorText,
        alignContent: "space-around",
      }}
      overlayColor="transparent"
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1 }}>
            {isUserAuthenticated && loggedUser && (
              <View style={{ backgroundColor: Colors.primaryColorDark }}>
                <Image
                  style={{
                    width: 75,
                    height: 75,
                    margin: 5,
                    borderRadius: 100,
                    marginTop: 20,
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
        inactiveTintColor: Colors.secondaryTextColor,
        activeTintColor: Colors.primaryColorDark,
        activeBackgroundColor: Colors.primaryColorLight,
      }}
    >
      <ReviewDrawerNavigator.Screen
        name="Home"
        component={BottomTabs}
        options={{
          drawerIcon: (drawerConfig) => (
            <MaterialIcons name="home" size={23} color={Colors.primaryColor} />
          ),
        }}
      />

      <ReviewDrawerNavigator.Screen
        name="Minhas resenhas"
        component={MyReviewsNavigator}
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
        name="Meus livros"
        component={UserBooksNavigator}
        color={Colors.primaryTextColor}
        options={{
          drawerIcon: (drawerConfig) => (
            <MaterialIcons name="book" size={23} color={Colors.primaryColor} />
          ),
        }}
      />

      <ReviewDrawerNavigator.Screen
        name="Seguindo"
        component={UsersFollowingNavigator}
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
    </ReviewDrawerNavigator.Navigator>
  );
};
