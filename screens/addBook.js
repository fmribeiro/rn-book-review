import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Card from "../components/Card";
import CustomText from "../components/CustomText";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import { book, review } from "../data/mockData";

const AddBookScreen = (props) => {
  const onClickHandler = (id) => {
    props.navigation.navigate("ReviewDetails", { review: review });
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Buscar o livro pelo titulo"
        autoFocus={true}
      />

      <View>
        <CustomText>
          Resultado da busca para o termo{" "}
          <CustomText style={styles.searchResultTitle}>
            "Dom Casmurro"
          </CustomText>
        </CustomText>
      </View>

      <ScrollView>
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Image
              style={styles.image}
              source={{
                uri: "https://images.unsplash.com/photo-1554672053-c4205442a9fb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fGJvb2t8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              }}
            />
            <View style={styles.bookInfoContainer}>
              <CustomText style={styles.title}>{book.title}</CustomText>
              <CustomText style={styles.bookInfo}>{book.author}</CustomText>
              <CustomText style={styles.bookInfo}>{book.pages}</CustomText>
              <CustomText style={styles.bookInfo}>{book.publisher}</CustomText>
            </View>
          </View>

          <CustomText numberOfLines={5}>{book.text}</CustomText>
          <TouchableOpacity activeOpacity={0.8}>
            <MaterialIcons
              name="save"
              size={30}
              color={Colors.primaryTextColor}
            />
          </TouchableOpacity>
        </Card>
      </ScrollView>
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
  title: {
    fontSize: 22,
    fontFamily: "roboto-bold",
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 5,
    flexDirection: "row",
  },
  icon: {
    color: Colors.primaryTextColor,
  },
  image: {
    width: 150,
    height: 200,
    margin: 5,
    borderRadius: 3,
  },
  bookInfoContainer: {
    flexDirection: "column",
    flexShrink: 1,
  },
  cardHeader: {
    flexDirection: "row",
  },
});

export default AddBookScreen;
