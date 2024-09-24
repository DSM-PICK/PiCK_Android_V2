import Back from "@/assets/icons/backIcon";
import { calcDate, font, get, getDiff, getToday } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { path, queryKeys } from "@/constants";
import MenuItem from "./components/mealsBox";
import Header from "@/components/common/header";
//import WrappedCalendarComponents from "../selfStudyList/components/calendar/selfStudyCalendar";
import WrappedCalendarComponents from "./components/mealsCalendar";

export const Melas = () => {
  const { theme } = useThemeStore();
  const navigation = useNavigation();

  const { fullDay } = getToday();

  const [date, setDate] = useState(fullDay);
  const _date = getDiff(date);

  function formatDate(dateString: string) {
    if (dateString) {
      const [year, month, day] = dateString.split("-");
      return `${month}월 ${day}일`;
    }
  }

  console.log(_date);
  console.log(date);

  const { data: mealData, isLoading } = useQuery({
    queryKey: [queryKeys.meal, date],
    queryFn: () => get(`${path.meal}/date?date=${date}`),
    select: (res) => Object.entries(res?.data?.meal_list),
    placeholderData: (prev) => prev,
  });

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  console.log(mealData);

  return (
    <>
      <View
        style={{
          backgroundColor: theme.BG,
          height: "100%",
        }}
      >
        <Header />
        <View style={{ paddingTop: 40 }}>
          <WrappedCalendarComponents onDateChange={handleDateChange} />
        </View>
        <View style={{ paddingVertical: 20, paddingHorizontal: 24 }}>
          <Text style={[font.heading[4], { color: theme.normal.black }]}>
            {_date === "오늘" && (
              <Text style={{ color: theme.Main[500] }}>오늘 </Text>
            )}
            {formatDate(date)}
          </Text>
        </View>
        <FlatList
          style={{ marginBottom: 30, paddingHorizontal: 24 }}
          overScrollMode="auto"
          contentContainerStyle={{
            gap: 10,
          }}
          data={mealData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <MenuItem
              menu={item as [string, { menu: string[]; cal: string }]}
            />
          )}
          ListEmptyComponent={<Text>불러오는 중입니다</Text>}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  Icon: {
    width: 24,
    height: 24,
  },
  content: {},
});
