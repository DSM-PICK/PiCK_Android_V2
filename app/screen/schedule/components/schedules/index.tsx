import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { months, path, queryKeys } from "@/constants";
import { ScheduleBox } from "./scheduleBox";
import { get, getToday } from "@/utils";
import TernaryView from "@/components/layout/TernaryView";
import useThemeStore from "@/utils/stores/usethemeProp";
import WrappedCalendarComponents from "./calendar";

const { year, month, date } = getToday();

export default function Schedules() {
  const { fullDay } = getToday();

  const [date, setDates] = useState(fullDay);
  const { theme } = useThemeStore();
  const [dates, setDate] = useState([year, month, date]);
  const [_year, _month] = dates;

  const { data: scheData } = useQuery({
    queryKey: [queryKeys.schedule, dates],
    queryFn: () =>
      get(`${path.schedule}/month?year=${_year}&month=${months[_month - 1]}`),
    select: (res) => res?.data,
    placeholderData: (prev) => prev,
  });

  const handleDateChange = (newDate) => {
    setDates(newDate);
  };

  const { data: selectDayData, isLoading } = useQuery({
    queryKey: [queryKeys.schedule, date],
    queryFn: () => get(`${path.schedule}/date?date=${date}`),
    select: (res) => res?.data,
  });

  console.log(selectDayData);

  return (
    <View style={styles.container}>
      <WrappedCalendarComponents onDateChange={handleDateChange} />
      <TernaryView
        data={isLoading}
        onTrue={
          <Text style={{ color: theme.normal.black }}>불러오고 있습니다.</Text>
        }
        onFalse={
          <View style={styles.emptyContainer}>
            <FlatList
              style={{ width: "100%" }}
              data={selectDayData}
              ListEmptyComponent={() => (
                <Text style={[{ color: theme.normal.black }]}>
                  일정이 없습니다.
                </Text>
              )}
              overScrollMode="never"
              initialNumToRender={2}
              contentContainerStyle={styles.listContentContainer}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => <ScheduleBox item={item} date={date} />}
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
    gap: 15,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContentContainer: {
    flexGrow: 1,
  },
});
