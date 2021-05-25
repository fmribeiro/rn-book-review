import React from "react";
import { useState } from "react";
import { View } from "react-native";

import { RoundButton } from "./RoundButton";

const SimpleFloatingActionButton = (props) => {
  return (
    <View>
      <RoundButton icon="add" buttonHandler={props.buttonHandler} />
    </View>
  );
};

export default SimpleFloatingActionButton;
