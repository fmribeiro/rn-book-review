import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import CustomText from "../components/CustomText";
import CustomHeaderButton from "../components/HeaderButton";
import SimpleFloatingActionButton from "../components/SimpleFloatingActionButton";
import * as bookActions from "../store/actions/books";

const BooksScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();

  const books = useSelector((state) => state.books.books);

  const loadBooks = useCallback(async () => {
    setIsRefreshing(true);

    try {
      await dispatch(bookActions.fetchBooks());
    } catch (error) {
      console.log(error);
    }

    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    loadBooks().then(() => {});
  }, [dispatch, loadBooks]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadBooks);

    return () => {
      unsubscribe();
    };
  }, [loadBooks]);

  const addBookHandler = () => {
    props.navigation.navigate("AddBook");
  };

  return (
    <View>
      <FlatList
        onRefresh={loadBooks}
        refreshing={isRefreshing}
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={(book) => (
          <View>
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <Image
                  style={styles.image}
                  source={{
                    uri: book.item.imagePath,
                  }}
                />
                <View style={styles.bookInfoContainer}>
                  <CustomText style={styles.title} numberOfLines={5}>
                    {book.item.title}
                  </CustomText>
                  <CustomText style={styles.bookInfo}>
                    {book.item.authors}
                  </CustomText>
                  <CustomText style={styles.bookInfo}>
                    {book.item.pageCount}
                  </CustomText>
                  <CustomText style={styles.bookInfo}>
                    {book.item.publisher}
                  </CustomText>
                </View>
              </View>

              <CustomText numberOfLines={5} style={{ marginVertical: 5 }}>
                {book.item.description}
              </CustomText>

              <View style={styles.reviewInfo}>
                <View>
                  <CustomText style={styles.reviewInfoText}>
                    {book.item.insertDate}
                  </CustomText>
                </View>

                <TouchableOpacity activeOpacity={0.7}>
                  <CustomText style={styles.reviewInfoText}>
                    {book.item.user.nickname}
                  </CustomText>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        )}
      />
      <SimpleFloatingActionButton buttonHandler={addBookHandler} />
    </View>
  );
};

export const bookScreenOptions = (navData) => {
  return {
    headerTitle: "Livros",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Search"
          iconName="md-search"
          onPress={() => {
            navData.navigation.navigate("Search");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
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
  reviewInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 5,
    marginVertical: 10,
  },
  reviewInfoText: {
    fontSize: 12,
    fontFamily: "roboto-bold",
  },
});

export default BooksScreen;
