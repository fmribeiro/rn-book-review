import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import CustomText from "../components/CustomText";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import * as bookActions from "../store/actions/books";

const AddBookScreen = (props) => {
  const token = useSelector((state) => state.auth.token);
  const loggedUser = useSelector((state) => state.users.user);
  const books = useSelector((state) => state.books.googleBooks);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startSearch, setStartSearch] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const dispatch = useDispatch();

  const searchGoogleBooksApi = useCallback(async () => {
    console.log("searching Google Books API...");
    setIsRefreshing(true);
    setStartSearch(true);
    try {
      await dispatch(bookActions.fetchGoogleBooks(bookTitle));
    } catch (error) {
      console.log(error);
    }

    setIsRefreshing(false);
  }, [dispatch, bookTitle]);

  useEffect(() => {
    if (bookTitle.trim().length > 3) {
      searchGoogleBooksApi().then(() => {});
    }
  }, [dispatch, bookTitle]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [searchGoogleBooksApi]);

  const textChangeHandler = (book) => {
    setBookTitle(book);
  };

  const saveBookHandler = async (book) => {
    try {
      if (loggedUser.id) {
        book.readStatus = "lido";
        book.id = null;
        book.userId = loggedUser.id;
        await dispatch(bookActions.saveBook(book, token));
        ToastAndroid.show("Livro adicionado com sucesso!", ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show(
        "Algo deu errado. Não foi possível salvar o livro!",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <MaterialIcons
          name="search"
          color={Colors.primaryTextColor}
          size={23}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Buscar livro pelo titulo"
          autoFocus={true}
          onChangeText={textChangeHandler}
        />
      </View>

      <View>
        {startSearch && !!bookTitle.trim() && (
          <CustomText style={styles.searchResultInfo}>
            Resultado da busca para o termo{" "}
            <CustomText style={styles.searchResultTitle}>
              {bookTitle}
            </CustomText>
          </CustomText>
        )}

        {startSearch && books && books.length === 0 && (
          <CustomText
            style={{
              ...styles.searchResultInfo,
              ...styles.searchResultNotFound,
            }}
          >
            Não foram encontradas resenhas para o livro pesquisado
          </CustomText>
        )}
      </View>

      <FlatList
        onRefresh={searchGoogleBooksApi}
        refreshing={isRefreshing}
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={(book) => (
          <View>
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                {book.item.imagePath && (
                  <Image
                    style={styles.image}
                    source={{
                      uri: book.item.imagePath,
                    }}
                  />
                )}
                <View style={styles.bookInfoContainer}>
                  <CustomText style={styles.title}>
                    {book.item.title}
                  </CustomText>

                  <CustomText style={styles.bookInfo}>
                    {book.item.authors}
                  </CustomText>

                  <CustomText style={styles.bookInfo}>
                    {book.item.publisher}
                  </CustomText>

                  {book.item.pageCount && (
                    <CustomText style={styles.bookInfo}>
                      Páginas: {book.item.pageCount}
                    </CustomText>
                  )}
                </View>
              </View>

              <CustomText numberOfLines={5}>{book.item.description}</CustomText>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => saveBookHandler(book.item)}
                  style={styles.button}
                >
                  <MaterialIcons name="save" size={23} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        )}
      />
    </View>
  );
};

export const addBookScreenOptions = (navData) => {
  return {
    headerTitle: "Salvar livro",
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

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  textInput: {
    backgroundColor: Colors.primaryColorLight,
    borderBottomColor: Colors.primaryColorDark,
    borderBottomWidth: 1,
    marginBottom: 5,
    fontFamily: "roboto-regular",
    textAlign: "justify",
  },
  searchResultTitleContainer: {},
  searchResultTitle: {
    fontFamily: "roboto-bold",
    fontSize: 16,
  },
  searchResultInfo: {
    marginRight: 10,
    marginLeft: 10,
  },
  searchResultNotFound: {
    fontFamily: "roboto-bold",
  },
  title: {
    fontSize: 22,
    fontFamily: "roboto-bold",
  },
  searchBox: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: Colors.primaryTextColor,
    paddingBottom: 10,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  inputStyle: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: "roboto-bold",
    textTransform: "capitalize",
    flexShrink: 1,
  },
  bookInfo: {},
  bookInfoContainer: {
    flexDirection: "column",
    flexShrink: 1,
  },
  card: {
    margin: 10,
  },
  cardHeader: {
    flexDirection: "row",
  },
  image: {
    width: 150,
    height: 200,
    margin: 5,
    borderRadius: 3,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  buttonContainer: {
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AddBookScreen;
