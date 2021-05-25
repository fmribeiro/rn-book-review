import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import CustomText from "../components/CustomText";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import * as reviewActions from "../store/actions/reviews";

const SearchScreen = (props) => {
  const reviews = useSelector((state) => state.reviews.searchReviews);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startSearch, setStartSearch] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const dispatch = useDispatch();

  const searchReviews = useCallback(async () => {
    console.log("searching...");
    setIsRefreshing(true);
    setStartSearch(true);
    try {
      await dispatch(reviewActions.searchReviews(bookTitle));
    } catch (error) {
      console.log(error);
    }

    setIsRefreshing(false);
  }, [dispatch, bookTitle]);

  useEffect(() => {
    console.log("useEffect");
    if (bookTitle.trim().length > 3) {
      searchReviews().then(() => {});
    }
  }, [dispatch, bookTitle]);

  useEffect(() => {
    console.log("unsubscribing...");
    const unsubscribe = props.navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [searchReviews]);

  const textChangeHandler = (book) => {
    console.log(`textChangeHandler: ${bookTitle}`);
    setBookTitle(book);
  };

  const onClickHandler = (review) => {
    console.log(`onClickHandler: ${bookTitle}`);
    props.navigation.navigate("ReviewDetails", { review });
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
          placeholder="Buscar resenha pelo titulo do livro"
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

        {startSearch && reviews && reviews.length === 0 && (
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
        onRefresh={searchReviews}
        refreshing={isRefreshing}
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={(review) => (
          <Card style={styles.card}>
            <TouchableNativeFeedback
              onPress={() => {
                onClickHandler(review.item);
              }}
            >
              <View style={styles.textContainer}>
                <CustomText style={styles.title}>
                  {review.item.bookTitle}
                </CustomText>
                <CustomText numberOfLines={5}>{review.item.review}</CustomText>
              </View>
            </TouchableNativeFeedback>
          </Card>
        )}
      />
    </View>
  );
};

export const searchScreenOptions = (navData) => {
  return {
    headerTitle: "Buscar resenhas",
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
});

export default SearchScreen;

// <ScrollView>
// <Card style={styles.card}>
//   <TouchableNativeFeedback>
//     <View style={styles.textContainer}>
//       <CustomText style={styles.title}>{review.title}</CustomText>
//       <CustomText numberOfLines={5}>{review.text}</CustomText>
//     </View>
//   </TouchableNativeFeedback>
// </Card>

// <Card style={styles.card}>
//   <TouchableNativeFeedback>
//     <View style={styles.textContainer}>
//       <CustomText style={styles.title}>{review.title}</CustomText>
//       <CustomText numberOfLines={5}>{review.text}</CustomText>
//     </View>
//   </TouchableNativeFeedback>
// </Card>

// <Card style={styles.card}>
//   <TouchableNativeFeedback onPress={onClickHandler}>
//     <View style={styles.textContainer}>
//       <CustomText style={styles.title}>{review.title}</CustomText>
//       <CustomText numberOfLines={5}>{review.text}</CustomText>
//     </View>
//   </TouchableNativeFeedback>
// </Card>
// </ScrollView>
