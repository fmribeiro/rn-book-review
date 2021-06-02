import React, { useContext } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import BooksList from "../components/BooksList";
import CustomHeaderButton from "../components/HeaderButton";
import * as bookActions from "../store/actions/books";
import { PageContext } from "../utils/page-context";

const UserBooksScreen = (props) => {
  const [loggedUser] = useContext(PageContext);

  const loadBooks = bookActions.fetchUserBooks(
    loggedUser.user.id,
    loggedUser.authentication.token
  );

  return (
    <BooksList fetchBooksActions={loadBooks} navigation={props.navigation} />
  );
};

export const userBooksOptions = (navData) => {
  return {
    headerTitle: "Livros que eu li",
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

export default UserBooksScreen;
