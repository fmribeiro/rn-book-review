import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";

export const RoundButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.roundButton}
      activeOpacity={0.8}
      onPress={props.buttonHandler ? props.buttonHandler : addButtonHandler}
    >
      <MaterialIcons
        name={props.icon}
        size={30}
        color={Colors.primaryColorText}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 10,
    right: 10,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: Colors.secondaryTextColor,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
