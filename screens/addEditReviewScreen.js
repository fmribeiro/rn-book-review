import { Picker } from "@react-native-community/picker";
import React, { useCallback, useEffect, useState } from "react";
import { TextInput, ToastAndroid } from "react-native";
import { Button, StyleSheet, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/HeaderButton";
import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../store/actions/reviews";
import * as bookActions from "../store/actions/books";

const AddEditReviewScreen = (props) => {
  const token = useSelector((state) => state.auth.token);
  const loggedUser = useSelector((state) => state.users.user);
  const readBooks = useSelector((state) => state.books.readBooks);
  const [bookTitle, setBookTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState("");
  const dispatch = useDispatch();

  const loadReadBooks = useCallback(async () => {
    try {
      setIsLoading(true);
      if (loggedUser.id && token) {
        await dispatch(bookActions.fetchReadBooks(loggedUser.id, token));
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadReadBooks();
  }, [dispatch, loadReadBooks]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadReadBooks);
    return () => {
      unsubscribe();
    };
  }, [loadReadBooks]);

  const saveReview = (review) => {
    console.log("saving review...");
    try {
      if (loggedUser.id) {
        review.userId = loggedUser.id;
        console.log(`review: ${JSON.stringify(review)}`);
        dispatch(reviewActions.saveReview(review, token));
      }
      ToastAndroid.show("Resenha adicionada com sucesso!", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        "Algo deu errado. Não foi possível salvar a resenha!",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <View>
      {readBooks && (
        <View>
          <View style={styles.inputContainer}>
            <CustomText>Livro</CustomText>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={bookTitle}
                onValueChange={(itemValue, itemIndex) =>
                  setBookTitle(itemValue)
                }
                style={styles.picker}
              >
                {readBooks.map((book, key) => {
                  return (
                    <Picker.Item
                      label={book.title}
                      value={book.title}
                      key={key}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <CustomText>Resenha do livro. Min: 150 carácteres</CustomText>

            <TextInput
              style={styles.textInput}
              placeholder="escreva a sua resenha"
              numberOfLines={10}
              multiline={true}
              value={review}
              onChangeText={(text) => setReview(text)}
            />
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Salvar"
                onPress={() => {
                  saveReview({ bookTitle, review });
                }}
              />
            </View>
          </View>
        </View>
      )}
      {!readBooks && !isLoading && (
        <View style={styles.inputContainer}>
          <CustomText style={{ fontSize: 18 }}>
            É preciso adicionar um livro para incluir uma resenha.
          </CustomText>
        </View>
      )}
    </View>
  );
};

export const AddEditReviewScreenOptions = (navData) => {
  return {
    headerTitle: "Criar Resenha",
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
  inputContainer: {
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
  },
  textInput: {
    backgroundColor: Colors.primaryColorLight,
    borderBottomColor: Colors.primaryColorDark,
    borderBottomWidth: 1,
  },
  button: {
    marginRight: 10,
    width: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 10,
    marginVertical: 5,
  },
  searchBox: {
    flexDirection: "row",
    paddingBottom: 10,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  pickerContainer: {
    backgroundColor: Colors.primaryColorLight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryColorDark,
  },
  picker: {
    height: 30,
  },
});

export default AddEditReviewScreen;
