import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";

const CustomButton = (props) => {
  const bottom = props.bottom ? props.bottom : 75;

  return (
    <TouchableOpacity
      style={{ ...styles.button, ...{ bottom } }}
      activeOpacity={0.8}
      onPress={props.buttonHandler}
    >
      <View style={styles.buttonContainer}>
        <MaterialIcons
          name={props.icon}
          size={25}
          color={Colors.primaryColorText}
        />
        <Text style={styles.buttonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    width: 100,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    right: 10,
    bottom: 75,
    borderColor: Colors.secondaryTextColor,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.primaryColorText,
  },
});

export default CustomButton;
