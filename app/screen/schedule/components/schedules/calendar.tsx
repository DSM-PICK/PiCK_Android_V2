import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

import useCalendarContext from "@/screen/selfStudyList/components/calendar/useCalendarContext";
import Calendar from "@/screen/selfStudyList/components/calendar";

const CalendarComponents = ({ onDateChange }) => {
  const { selectedDate } = useCalendarContext();

  const handleDateClick = (date: string) => {
    const selected = new Date(date);

    const formattedDate = selected.toISOString().split("T")[0];

    selectedDate.selectDate(date);
    console.log(formattedDate);

    if (onDateChange) {
      onDateChange(formattedDate);
    }
  };

  return (
    <View style={[styles.container]}>
      <Calendar.Header />
      <Calendar.Body onClickDate={handleDateClick} />
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
