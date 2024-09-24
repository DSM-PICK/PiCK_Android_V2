import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { CalendarContext } from "./useCalendarContext";
import CalendarHeader from "./calendarHeader";
import CalendarBody from "./calendarBody";
import useCalendar from "@/hooks/useCalendar";
import SelectedDate from "./selectedDate";

const CalendarRoot = ({ children }: { children: ReactNode }) => {
  const calendar = useCalendar();
  return (
    <CalendarContext.Provider value={calendar}>
      <View style={styles.container}>{children}</View>
    </CalendarContext.Provider>
  );
};

const Calendar = Object.assign(CalendarRoot, {
  Header: CalendarHeader,
  Body: CalendarBody,
  Footer: SelectedDate,
});

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 8,
    width: "100%",
    maxHeight: 440,
  },
});
