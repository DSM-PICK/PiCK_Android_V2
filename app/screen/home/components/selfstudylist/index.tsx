import useThemeStore from "@/utils/stores/usethemeProp";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Test from "@/assets/icons/selfCalendar.png";
import { useQuery } from "@tanstack/react-query";
import { path, queryKeys } from "@/constants";
import { calcDate, font, get, getToday } from "@/utils";
import { TeacherItem } from "./TeacherItem";

const { year, month, date: _date } = getToday();

export const TodaySelfStudyList = () => {
  const [date, setDate] = useState({ year, month, date: _date });

  const { data: teacherData, isError } = useQuery({
    queryKey: [queryKeys.teacher, date],
    queryFn: () => get(`${path.selfStudy}/today?date=${calcDate(date)}`),
    placeholderData: (prev) => prev,
    select: (res) => res?.data,
  });

  const { theme } = useThemeStore();
  return (
    <View style={[{ backgroundColor: theme.Gray[50] }, style.container]}>
      <View style={{ gap: 12 }}>
        <Text style={[font.body[2], { color: theme.Gray[900] }]}>
          오늘의 자습감독 선생님 입니다
        </Text>
        {teacherData?.map((item, index) => (
          <TeacherItem key={index} item={item} />
        ))}
      </View>
      <Image source={Test} alt="fen" />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 23,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
