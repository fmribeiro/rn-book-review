import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

const CustomText = (props) => {
  return (
    // <View style={styles.textContainer}>
    <Text
      {...props}
      style={{ ...styles.text, ...props.style }}
      selectionColor={Colors.secondaryTextColor}
    >
      {props.children}
    </Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {},
  text: {
    fontFamily: "roboto-regular",
    color: Colors.primaryTextColor,
  },
});

export default CustomText;
