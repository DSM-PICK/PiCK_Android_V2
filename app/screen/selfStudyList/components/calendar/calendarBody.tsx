import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import useCalendarContext from "./useCalendarContext";
import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";

interface CalendarBodyProp {
  onClickDate: (date: string) => void;
}

const CalendarBody = ({ onClickDate }: CalendarBodyProp) => {
  const { theme } = useThemeStore();
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  const { daysInMonth, selectedDate, currentDate } = useCalendarContext();

  const groupDaysInWeeks = () => {
    const currentMonthDays = daysInMonth.filter(
      (date) => date.month === currentDate.month
    );
    const weeksArray = [];
    for (let i = 0; i < currentMonthDays.length; i += 7) {
      weeksArray.push(currentMonthDays.slice(i, i + 7));
    }
    return weeksArray;
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.dayWrapper, { borderBlockColor: theme.Gray[50] }]}>
        {weeks.map((week) => (
          <Text
            key={week}
            style={[styles.calendarItem, { color: theme.normal.black }]}
          >
            {week}
          </Text>
        ))}
      </View>
      <FlatList
        data={groupDaysInWeeks()}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item: week }) => (
          <View style={styles.weekRow}>
            {week.map((date) => (
              <TouchableOpacity
                key={date.date}
                onPress={() => onClickDate(date.date)}
                style={[
                  styles.day,
                  {
                    backgroundColor:
                      selectedDate.date === date.date
                        ? theme.Main[50]
                        : "transparent",
                  },
                ]}
              >
                <Text
                  style={[
                    font.caption[1],
                    {
                      color:
                        currentDate.month === date.month
                          ? theme.normal.black
                          : theme.Gray[300],
                    },
                  ]}
                >
                  {date.day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default CalendarBody;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
  dayWrapper: {
    flexDirection: "row",
    //justifyContent: "space-around",
    padding: 10,
    borderBottomWidth: 1,
  },
  calendarItem: {
    padding: 10,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  weekRow: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  day: {
    padding: 10,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
});
