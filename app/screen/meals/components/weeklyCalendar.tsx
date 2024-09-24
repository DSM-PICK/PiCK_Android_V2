import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import useCalendarContext from "./useCalendarContext";
import { DownArrow } from "@/assets/icons";
import useThemeStore from "@/utils/stores/usethemeProp";
import { font } from "@/utils";

interface WeeklyCalendarProps {
  selectedDate: Date;
  onBackToMonthlyClick: () => void;
  onDateSelect: (date: string) => void;
}

const WeeklyCalendar = ({
  selectedDate,
  onBackToMonthlyClick,
  onDateSelect,
}: WeeklyCalendarProps) => {
  const { theme } = useThemeStore();
  const { currentDate } = useCalendarContext();
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  const isSelectedDate = (date: Date) => isSameDay(date, selectedDate);

  return (
    <View style={styles.container}>
      <Text
        style={[font.label[1], styles.dateTitle, { color: theme.normal.black }]}
      >
        {currentDate.year}년 {currentDate.month}월
      </Text>
      <View style={styles.containerWrap}>
        <View
          style={[styles.dayWrapper, { borderBottomColor: theme.Gray[50] }]}
        >
          {weeks?.map((week) => (
            <Text
              key={week}
              style={[
                font.label[1],
                { color: theme.normal.black },
                styles.calendarItem,
              ]}
            >
              {week}
            </Text>
          ))}
        </View>
        <View style={styles.header}>
          {daysOfWeek?.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.day,
                isSelectedDate(date) && { backgroundColor: theme.Main[100] },
              ]}
              onPress={() => onDateSelect(date.toString())}
            >
              <Text style={[font.caption[1], { color: theme.normal.black }]}>
                {format(date, "d")}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={onBackToMonthlyClick}>
        <DownArrow />
      </TouchableOpacity>
    </View>
  );
};

export default WeeklyCalendar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  dateTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  containerWrap: {
    paddingVertical: 25,
  },
  calendarItem: {
    padding: 10,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  dayWrapper: {
    flexDirection: "row",
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    marginTop: 8,
  },
  day: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: "transparent",
  },
});
