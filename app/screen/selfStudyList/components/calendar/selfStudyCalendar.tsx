import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Calendar from "./index";
import WeeklyCalendar from "./weeklyCalendar";
import useCalendarContext from "./useCalendarContext";
import useThemeStore from "@/utils/stores/usethemeProp";
import { DownArrow } from "@/assets/icons";

const CalendarComponents = ({ onDateChange }) => {
  const { theme } = useThemeStore();
  const [isMonthlyView, setIsMonthlyView] = useState(false);
  const { selectedDate } = useCalendarContext();

  const handleDateClick = (date: string) => {
    const selected = new Date(date);

    const formattedDate = selected.toISOString().split("T")[0];

    selectedDate.selectDate(date);
    setIsMonthlyView(false);
    console.log(formattedDate);

    if (onDateChange) {
      onDateChange(formattedDate);
    }
  };

  const handleBackToMonthlyClick = () => {
    setIsMonthlyView(true);
  };

  return (
    <View style={[styles.container]}>
      {isMonthlyView ? (
        <>
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => setIsMonthlyView(false)}
          >
            <DownArrow />
          </TouchableOpacity>
          <Calendar.Header />
          <Calendar.Body onClickDate={handleDateClick} />
        </>
      ) : (
        <>
          <WeeklyCalendar
            selectedDate={new Date(selectedDate.date)}
            onBackToMonthlyClick={handleBackToMonthlyClick}
            onDateSelect={handleDateClick}
          />
        </>
      )}
    </View>
  );
};

const WrappedCalendarComponents = ({ onDateChange }) => (
  <Calendar>
    <CalendarComponents onDateChange={onDateChange} />
  </Calendar>
);

export default WrappedCalendarComponents;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 20,
  },
});
