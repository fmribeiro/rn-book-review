import React from "react";
import { View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/HeaderButton";
import UsersList from "../components/UsersList";
import * as userActions from "../store/actions/users";

const UsersScreen = (props) => {
  const loadUsers = userActions.fetchUsers();

  return (
    <View>
      <UsersList userActions={loadUsers} navigation={props.navigation} />
    </View>
  );
};

export const userScreenOptions = (navData) => {
  return {
    headerTitle: "Usuários",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UsersScreen;
