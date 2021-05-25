import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";

const BottomCardButtons = (props) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={props.onDetails} style={styles.button}>
        <MaterialIcons name="preview" size={23} style={styles.icon} />
      </TouchableOpacity>

      {props.isUserLogged && (
        <TouchableOpacity onPress={props.onFavorite} style={styles.button}>
          <MaterialIcons
            name="favorite-outline"
            size={23}
            color={Colors.accentColor}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}

      {props.isUserLogged && (
        <TouchableOpacity onPress={props.onEdit} style={styles.button}>
          <MaterialIcons name="edit" size={23} style={styles.icon} />
        </TouchableOpacity>
      )}

      {props.isUserLogged && (
        <TouchableOpacity onPress={props.onRemove} style={styles.button}>
          <MaterialIcons name="delete" size={23} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    color: Colors.primaryTextColor,
  },
});

export default BottomCardButtons;
