import React, { useContext } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/HeaderButton";
import UsersList from "../components/UsersList";
import * as userActions from "../store/actions/users";
import { PageContext } from "../utils/page-context";

const UsersFollowingScreen = (props) => {
  const [loggedUser] = useContext(PageContext);

  const usersFollowing = userActions.fetchFollowingUsers(
    loggedUser.user.id,
    loggedUser.authentication.token
  );

  return (
    <UsersList userActions={usersFollowing} navigation={props.navigation} />
  );
};

export const usersFollowingScreenOptions = (navData) => {
  return {
    headerTitle: "Quem eu sigo",
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

export default UsersFollowingScreen;
