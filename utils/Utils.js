import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export const convertObjetIdToDate = (objectId) => {
  const insertDate = new Date(
    parseInt(objectId.substring(0, 8), 16) * 1000
  ).toUTCString();
  return moment(insertDate).format("DD/MM/YYYY hh:mm");
};

export const getCurrentUser = async () => {
  const loggedUser = await AsyncStorage.getItem("loggedUser");
  return JSON.parse(loggedUser);
};

export const getCurrentUserJSON = async () => {
  const loggedUser = await AsyncStorage.getItem("loggedUser");
  return loggedUser;
};
