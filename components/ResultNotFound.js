import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import CustomText from "./CustomText";

const ResultNotFound = (props) => {
  return <CustomText style={styles.searchResultInfo}>{props.text}</CustomText>;
};

const styles = StyleSheet.create({
  searchResultInfo: {
    marginRight: 10,
    marginLeft: 10,
    fontFamily: "roboto-bold",
  },
});

export default ResultNotFound;
