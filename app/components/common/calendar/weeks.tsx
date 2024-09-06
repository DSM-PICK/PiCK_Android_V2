import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { font, getDates, getToday } from "@/utils";
import { weekPropType } from "CalanderType";
import { days } from "@/constants";
import { HiddenView } from "@/components/layout";
import useThemeStore from "@/utils/stores/usethemeProp";

const { year, month, date: todayDate } = getToday();

// 이전 달의 마지막 날짜 계산 함수
const getPrevMonthEndDate = (year: number, month: number) => {
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  return new Date(prevYear, prevMonth, 0).getDate();
};

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
  console.log(picks);

  const { startDay, endDate } = getDates(date); // 현재 달의 시작 요일과 마지막 날짜
  const prevEndDate = getPrevMonthEndDate(calYear, calMonth); // 이전 달의 마지막 날짜 계산

  const isToday = calYear === year && calMonth === month;
  const isSelected = selected && calYear === selYear && calMonth === selMonth;

  const arr = new Array(startDay)
    .fill("")
    .map((_, i) => prevEndDate - startDay + i + 1)
    .concat(Array.from(new Array(endDate).keys(), (v) => v + 1))
    .concat(
      Array.from(new Array(35 - (endDate + startDay)).keys(), (v) => v + 1)
    )
    .slice(0, 35);

  let _weeks = [];
  let _days = [];

  const handleSelect = (_date: number, day: number) => {
    console.log(_date, day + "mdweim");
    setSelected([calYear, calMonth, _date]);
    //onSelect({ year: calYear, month: calMonth, date: _date, day: days[day] });
  };

  arr.map((item, index) => {
    const isPrevMonth = index < startDay;
    const isNextMonth = index >= endDate + startDay;
    const isCurrentMonth = !isPrevMonth && !isNextMonth;
    const isTodayStyle = isToday && todayDate === item && isCurrentMonth;

    const isSelectedStyle = isSelected && isCurrentMonth && item === selDate;

    _days.push(
      <TouchableWithoutFeedback
        key={index}
        style={[
          styles.dayContainer,
          isTodayStyle && {
            backgroundColor: theme.Main[100],
            borderRadius: 100,
          },
          isSelectedStyle && {
            borderColor: theme.Main[100],
            borderWidth: 1,
            borderRadius: 100,
          },
        ]}
        onPress={() => {
          !onSelect && isCurrentMonth && handleSelect(item, _days.length);
        }}
      >
        <Text
          style={[
            {
              color: isCurrentMonth ? theme.normal.black : theme.Gray[300], // 이전 달/다음 달 날짜는 회색 처리
            },
            font.caption[1],
          ]}
        >
          {item}
        </Text>
        <HiddenView
          data={
            (isSelected && item === selDate) ||
            (picks?.includes(item) && isCurrentMonth)
          }
        >
          <View
            style={[styles.dotElement, { backgroundColor: theme.Main[500] }]}
          />
        </HiddenView>
      </TouchableWithoutFeedback>
    );

    if (_days.length > 6 || index === arr.length - 1) {
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
  },
  weekLineContainer: {
    flexDirection: "row",
    gap: 24,
  },
  dotElement: {
    width: 5,
    height: 5,
    borderRadius: 100,
    position: "absolute",
    bottom: -8,
  },
});
