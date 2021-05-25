import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";

const Card = (props) => {
  return (
    <View onPress={props.onClick} style={{ ...styles.card, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: Colors.primaryColorText,
    padding: 5,
    margin: 10,
  },
});

export default Card;
