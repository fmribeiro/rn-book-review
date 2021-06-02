import React, { useContext } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import BooksList from "../components/BooksList";
import CustomHeaderButton from "../components/HeaderButton";
import * as bookActions from "../store/actions/books";
import { PageContext } from "../utils/page-context";

const BooksScreen = (props) => {
  const [loggedUser] = useContext(PageContext);

  const loadBooks = bookActions.fetchBooks();

  return (
    <BooksList fetchBooksActions={loadBooks} navigation={props.navigation} />
  );
};

export const booksOptions = (navData) => {
  return {
    headerTitle: "Meus livros",
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

export default BooksScreen;
