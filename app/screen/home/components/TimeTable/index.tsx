import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { View, StyleSheet, Text } from "react-native";
import { path, queryKeys } from "@/constants";
import { font, get, getToday } from "@/utils";
import Subject from "./Subject";
import useThemeStore from "@/utils/stores/usethemeProp";

const { fullDayShort } = getToday();

export default function TimeTable() {
  const { theme } = useThemeStore();

  const { data: tableData } = useQuery({
    queryKey: queryKeys.timeTable,
    queryFn: () => get(`${path.timeTable}/today`),
    select: (res) => res?.data.timetables,
  });

  return (
    <View style={{ gap: 12 }}>
      <View style={styles.headerContainer}>
        <Text
          style={[
            font.label[1],
            { color: theme.Gray[700], paddingVertical: 8 },
          ]}
        >
          오늘의 시간표
        </Text>
      </View>
      <View>
        <FlatList
          overScrollMode="never"
          contentContainerStyle={{ gap: 10 }}
          data={tableData}
          ListEmptyComponent={() => (
            <Text style={{ color: theme.normal.black }}>시간표가 없습니다</Text>
          )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Subject
              index={index + 1}
              name={item.subject_name}
              icon={item.image}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
