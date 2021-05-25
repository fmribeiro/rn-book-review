import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../components/BottomCardInfo";

const BottomCardInfo = (props) => {
  return (
    <View style={{ ...styles.reviewInfo, ...props.style }}>
      <View>
        <CustomText style={styles.reviewInfoText}>{props.date}</CustomText>
      </View>
      <View>
        <TouchableOpacity activeOpacity={0.7}>
          <CustomText style={styles.reviewInfoText}>
            {props.loggedUser}
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 5,
  },
  reviewInfoText: {
    fontSize: 12,
    fontFamily: "roboto-bold",
  },
});

export default BottomCardInfo;
