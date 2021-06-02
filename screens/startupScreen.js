import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from "../store/actions/auth";
import * as reviewActions from "../store/actions/reviews";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
import { StyleSheet } from "react-native";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        dispatch(authActions.setDitTryAutoLogin());
        return;
      }

      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(authActions.setDitTryAutoLogin());
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  //carrega as reviews ao iniciar, inicia o backend antes de abrir a aplicacao
  const loadReviews = useCallback(async () => {
    console.log("start backend on startup...");
    try {
      await dispatch(reviewActions.fetchReviews());
    } catch (error) {
      console.log("Erro ao iniciar o backend");
    }
  }, [dispatch]);

  useEffect(() => {
    loadReviews();
  }, [dispatch, loadReviews]);

  return (
    <View>
      <ActivityIndicator size="large" color={Colors.accentColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
