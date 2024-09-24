import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { calcDate, font, get, getToday } from "@/utils";
import { path, queryKeys } from "@/constants";
import MenuItem from "./MenuItem";
import useThemeStore from "@/utils/stores/usethemeProp";

const { year, month, date: _date } = getToday();

export const Meal = () => {
  const [date, setDate] = useState({ year, month, date: _date });
  const { theme } = useThemeStore();

  const { data: mealData } = useQuery({
    queryKey: [queryKeys.meal, date],
    queryFn: () => get(`${path.meal}/date?date=${calcDate(date)}`),
    select: (res) => Object.entries(res?.data?.meal_list),
    placeholderData: (prev) => prev,
  });

  console.log(mealData);

  return (
    <View style={styles.container}>
      <Text style={[font.label[1], { color: theme.Gray[700] }]}>
        오늘의 급식
      </Text>
      <FlatList
        overScrollMode="never"
        contentContainerStyle={{
          gap: 10,
        }}
        data={mealData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <MenuItem menu={item as [string, { menu: string[]; cal: string }]} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
