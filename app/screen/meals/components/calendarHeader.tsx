import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import useCalendarContext from "./useCalendarContext";
import { LeftArrow, RightArrow } from "@/assets/icons";
import useThemeStore from "@/utils/stores/usethemeProp";
import { font } from "@/utils";

const CalendarHeader = () => {
  const { theme } = useThemeStore();
  const { dispatch, currentDate } = useCalendarContext();

  return (
    <View style={[styles.container]}>
      <View style={styles.changeButton}>
        <TouchableOpacity onPress={dispatch.handlePrevMonth}>
          <LeftArrow Fill={theme.normal.black} />
        </TouchableOpacity>
        <Text style={[font.label[1], { color: theme.normal.black }]}>
          {currentDate.year}년 {currentDate.month}월
        </Text>
        <TouchableOpacity onPress={dispatch.handleNextMonth}>
          <RightArrow Fill={theme.normal.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CalendarHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
  },
  changeButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 20,
  },
});
