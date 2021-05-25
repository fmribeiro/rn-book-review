import moment from "moment";

export const convertObjetIdToDate = (objectId) => {
  const insertDate = new Date(
    parseInt(objectId.substring(0, 8), 16) * 1000
  ).toUTCString();
  return moment(insertDate).format("DD/MM/YYYY hh:mm");
};
