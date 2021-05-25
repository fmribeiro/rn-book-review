import React from "react";
import { useState } from "react";
import { View } from "react-native";

import { RoundButton } from "./RoundButton";

const FloatingActionButton = (props) => {
  const [showAddButtons, setShowAddButtons] = useState(false);
  const [addButtonIcon, setAddButtonIcon] = useState("add");

  const addButtonHandler = () => {
    setShowAddButtons(!showAddButtons);
    setAddButtonIcon(showAddButtons ? "add" : "close");
  };

  return (
    <View>
      <RoundButton icon={addButtonIcon} buttonHandler={addButtonHandler} />

      {showAddButtons && <View>{props.children}</View>}
    </View>
  );
};

export default FloatingActionButton;

// <FloatingActionButton addButtonHandler={() => {}}>
// <CustomButton
//   icon="rate-review"
//   title="Resenha"
//   buttonHandler={() => addReviewHandler()}
//   style={styles.book}
// />
// </FloatingActionButton>

// book: {
//   bottom: 75,
//   right: 10,
// },
