import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Weeks from "./weeks";

const DaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getMonthDates(year, month) {
  let date = new Date(year, month, 1);
  const dates = [];
  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
}

function getWeekRange(selectedDate) {
  const startOfWeek = new Date(selectedDate);
  const endOfWeek = new Date(selectedDate);

  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
  endOfWeek.setDate(selectedDate.getDate() + (6 - selectedDate.getDay()));

  return { startOfWeek, endOfWeek };
}

export default function WCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("monthly");

  const monthDates = getMonthDates(
    selectedDate.getFullYear(),
    selectedDate.getMonth()
  );

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setCurrentView("weekly");
  };

  const renderMonthlyView = () => (
    <View style={styles.monthContainer}>
      {monthDates.map((date, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleDayClick(date)}
          style={styles.dayContainer}
        >
          <Text> {date.getDate()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderWeeklyView = () => {
    const { startOfWeek, endOfWeek } = getWeekRange(selectedDate);
    return <Text>dkwoep</Text>;
  };

  return (
    <View style={styles.container}>
      {currentView === "monthly" ? renderMonthlyView() : renderWeeklyView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  monthContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    //justifyContent: "space-around",
  },
  dayContainer: {
    padding: 10,
    margin: 2,
    backgroundColor: "#f0f0f0",
  },
});
