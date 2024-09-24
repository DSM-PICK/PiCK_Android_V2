import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { font, getDates, getToday } from "@/utils";
import { weekPropType } from "CalanderType";
import { days } from "@/constants"; // 요일 배열이 포함된 파일
import { HiddenView } from "@/components/layout";
import useThemeStore from "@/utils/stores/usethemeProp";

const { year, month, date: todayDate } = getToday();

export default function Weeks({
  date,
  setSelected,
  picks,
  selected,
  onSelect,
}: weekPropType) {
  const { theme } = useThemeStore();
  const [selYear, selMonth, selDate] = selected || [0, 0, 0];
  const [calYear, calMonth] = date;

  const { startDay, endDate } = getDates(date);

  const isToday = calYear === year && calMonth === month;
  const isSelected = selected && calYear === selYear && calMonth === selMonth;

  const arr = Array.from(new Array(endDate).keys(), (v) => v + 1);

  let _weeks = [];
  let _days = [];

  const handleSelect = (_date: number, day: number) => {
    setSelected([calYear, calMonth, _date]);
  };

  // 요일 배열
  const weekDays = days; // days 배열이 ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] 형식이어야 합니다.

  // 요일 라인을 추가
  const renderWeekDays = () => (
    <View style={styles.weekLineContainer}>
      {weekDays.map((day, index) => (
        <Text
          key={index}
          style={[
            styles.dayLabel,
            { color: theme.normal.black },
            font.label[1],
          ]}
        >
          {day}
        </Text>
      ))}
    </View>
  );

  _weeks.push(renderWeekDays()); // 요일 추가

  arr.map((item, index) => {
    const isCurrentMonth = true; // 현재 달의 날짜이므로 항상 true
    const isTodayStyle = isToday && todayDate === item; // 오늘 날짜 스타일
    const isSelectedStyle = isSelected && item === selDate; // 선택된 날짜 스타일

    _days.push(
      <TouchableWithoutFeedback
        key={index}
        style={[styles.dayContainer]}
        onPress={() => {
          !onSelect && handleSelect(item, _days?.length);
        }}
      >
        <Text
          style={[
            {
              color: theme.normal.black,
            },
            isSelectedStyle && {
              borderColor: theme.Main[100],
              borderWidth: 1,
              borderRadius: 100,
            },
            isTodayStyle && {
              backgroundColor: theme.Main[100],
              borderRadius: 100,
            },
            font.caption[1],
          ]}
        >
          {item}
        </Text>
        <HiddenView data={picks?.includes(item) && isCurrentMonth}>
          <View
            style={[styles.dotElement, { backgroundColor: theme.Main[500] }]}
          />
        </HiddenView>
      </TouchableWithoutFeedback>
    );

    if (_days?.length > 6 || index === arr?.length - 1) {
      _weeks.push(
        <View key={index} style={styles.weekLineContainer}>
          {_days.map((i) => i)}
        </View>
      );
      _days = [];
    }
  });

  return <View style={{ gap: 20 }}>{_weeks.map((item) => item)}</View>;
}

const styles = StyleSheet.create({
  dayContainer: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  weekLineContainer: {
    flexDirection: "row",
    gap: 24,
  },
  dayLabel: {
    width: 28,
    textAlign: "center",
  },
  dotElement: {
    width: 5,
    height: 5,
    borderRadius: 100,
    position: "absolute",
    bottom: -8,
  },
});
