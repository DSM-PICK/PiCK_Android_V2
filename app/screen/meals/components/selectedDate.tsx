import React from "react";
import { View } from "react-native";
import useCalendarContext from "./useCalendarContext";

const SelectedDate = () => {
  const { selectedDate } = useCalendarContext();
  return <View>{selectedDate.date}</View>;
};

export default SelectedDate;
