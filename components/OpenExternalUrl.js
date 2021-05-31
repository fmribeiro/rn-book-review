import React, { useCallback } from "react";
import { Alert, Linking } from "react-native";

const OpenURL = (props) => {
  const url = props.url;

  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Impossível abri o endereço: ${url}`);
    }
  }, [url]);

  return (
    <CustomTextt style={props.style} onPress={handlePress}>
      {props.children}
    </CustomTextt>
  );
};
