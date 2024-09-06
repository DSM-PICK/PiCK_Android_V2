import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { font, getToday } from "@/utils";
import { calPropType } from "CalanderType";
import { hitSlop } from "@/constants";
import Weeks from "./weeks";
import useThemeStore from "@/utils/stores/usethemeProp";
import { Arrow } from "@/assets/icons";

const { year, month, date: _date } = getToday();

export default function Calendar({ picks, onMove, onSelect }: calPropType) {
  const [selected, setSelected] = useState(undefined);
  const [date, setDate] = useState([year, month]);
  const [calYear, calMonth] = date;
  const { theme } = useThemeStore();

  useEffect(() => {
    !!onMove && onMove({ year: calYear, month: calMonth });
  }, [date]); // move함수 사용할 떄 prop에 date 값이 수정 전으로 들어가서 임시로 이렇게 해 둠

  const handleMove = (to: boolean) => {
    if (to) {
      const isOver = calMonth + 1 > 12;
      setDate((prev) => (isOver ? [prev[0] + 1, 1] : [prev[0], prev[1] + 1]));
    } else {
      const isUnder = calMonth - 1 < 1;
      setDate((prev) => (isUnder ? [prev[0] - 1, 12] : [prev[0], prev[1] - 1]));
    }
  };

  return (
    <View style={{ gap: 10, alignItems: "center" }}>
      <View style={styles.headerContainer}>
        <Arrow
          Fill={theme.normal.black}
          onPress={() => handleMove(false)}
          hitSlop={hitSlop}
        />
        <Text style={[font.label[1], { color: theme.normal.black }]}>
          {date[0]}년 {date[1].toString().padStart(2, "0")}월
        </Text>
        <Arrow
          Fill={theme.normal.black}
          onPress={() => handleMove(true)}
          style={{
            transform: [{ rotate: "180deg" }],
          }}
          hitSlop={hitSlop}
        />
      </View>
      <Weeks
        date={date}
        picks={picks}
        onSelect={onSelect}
        selected={selected}
        setSelected={setSelected}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    gap: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
  },
});
