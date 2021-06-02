import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import Colors from "../constants/Colors";
import { BookNavigator } from "./BooksNavigator";
import { ReviewNavigator } from "./ReviewsNavigator";
import { searchReviewNavigator } from "./ReviewsNavigator";
import { UserNavigator } from "./UsersNavigator";

const Tab = createBottomTabNavigator();

const BottomTabs = (props) => {
  return (
    <Tab.Navigator initialRouteName="Reviews">
      <Tab.Screen
        name="Resenhas"
        component={ReviewNavigator}
        color={Colors.primaryTextColor}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="rate-review"
              size={23}
              color={Colors.primaryColor}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Livros"
        component={BookNavigator}
        color={Colors.primaryTextColor}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="book" size={23} color={Colors.primaryColor} />
          ),
        }}
      />

      <Tab.Screen
        name="Usuários"
        component={UserNavigator}
        color={Colors.primaryTextColor}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="people"
              size={23}
              color={Colors.primaryColor}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Busca"
        component={searchReviewNavigator}
        color={Colors.primaryTextColor}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="search"
              size={23}
              color={Colors.primaryColor}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
