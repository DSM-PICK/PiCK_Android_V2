import Back from "@/assets/icons/backIcon";
import { calcDate, font, get, getDiff, getToday } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SelfListBox from "./components/box";
import WrappedCalendarComponents from "./components/calendar/selfStudyCalendar";
import { useQuery } from "@tanstack/react-query";
import { path, queryKeys } from "@/constants";

export const SelfStudyList = () => {
  const { theme } = useThemeStore();
  const navigation = useNavigation();

  const { fullDay } = getToday();
  const [dates, setDates] = useState(fullDay); 
  const _date = getDiff(dates);

  function formatDate(dateString) {
    if (dateString) {
      const [year, month, day] = dateString.split("-");
      return `${month}월 ${day}일`;
    }
  }

  const { data: teacherData, isError } = useQuery({
    queryKey: [queryKeys.teacher, dates],
    queryFn: () => get(`${path.selfStudy}/today?date=${dates}`),

    placeholderData: (prev) => prev,
    select: (res) => res?.data,
  });

  const handleDateChange = (newDate) => {
    setDates(newDate);
  };

  return (
    <View
      style={{
        backgroundColor: theme.BG,
        height: "100%",
        paddingTop: 44,
        paddingHorizontal: 24,
      }}
    >
      <View style={styles.header}>
        <Pressable style={styles.Icon} onPress={() => navigation.goBack()}>
          <Back Fill={theme.normal.black} />
        </Pressable>
        <Text style={[font.body[1], { color: theme.normal.black }]}>
          자습 감독 선생님 확인
        </Text>
        <View style={styles.Icon} />
      </View>
      <View style={{ paddingVertical: 20, marginTop: 32 }}>
        <Text
          style={[
            font.heading[4],
            { color: _date === "오늘" ? theme.normal.black : theme.Main[500] },
          ]}
        >
          {formatDate(dates)}
        </Text>
        <Text style={[font.heading[4], { color: theme.normal.black }]}>
          {_date === "오늘" ? (
            <>
              <Text style={[{ color: theme.Main[500] }]}>오늘의 자습감독 </Text>
              선생님 입니다
            </>
          ) : (
            <>자습감독 선생님 입니다</>
          )}
        </Text>
      </View>
      <View>
        {teacherData?.length !== 0 ? (
          teacherData?.map((item, index) => (
            <SelfListBox
              key={index}
              floor={item.floor}
              teacher={item.teacher_name}
            />
          ))
        ) : (
          <Text style={[font.label[1], { color: theme.normal.black }]}>
            등록된 자습감독 선생님이 없습니다
          </Text>
        )}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          marginHorizontal: 24,
        }}
      >
        <WrappedCalendarComponents onDateChange={handleDateChange} />
      </View>
    </View>
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
