import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomText from "../components/CustomText";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

const AddEditReviewScreen = (props) => {
  return (
    <View>
      <View style={styles.inputContainer}>
        <CustomText>Livro lido</CustomText>
        <TextInput style={styles.textInput} placeholder="livro" />
      </View>

      <View style={styles.inputContainer}>
        <CustomText>Resenha do livro. Min: 150 carácteres</CustomText>
        <TextInput
          style={styles.textInput}
          placeholder="escreva a sua resenha"
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Salvar" />
        </View>
      </View>
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
    marginVertical: 10,
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
  },
});

export default AddEditReviewScreen;
