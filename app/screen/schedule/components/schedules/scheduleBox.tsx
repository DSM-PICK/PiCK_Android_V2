import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { days } from "@/constants";
import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";

type ItemType = {
  day: string;
  event_name: string;
  id: string;
};

interface PropType {
  item: ItemType;
  date: number[];
}

export const ScheduleBox = ({ item, date }: PropType) => {
  const { theme } = useThemeStore();
  const _date = new Date(`${date[0]}-${date[1]}-${item.day}`);

  return (
    <View style={{ width: "100%" }}>
      <View style={styles.container}>
        <View
          style={[styles.lineElement, { backgroundColor: theme.Main[500] }]}
        />
        <Text style={[font.subTitle[1], { color: theme.normal.black }]}>
          {item.event_name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  lineElement: {
    width: 3,
    height: 50,
  },
});
