import React, { useState, useRef, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { path, queryKeys } from "@/constants";
import { Carousel } from "@/components/layout";
import Subject from "./subject";
import { font, get, getToday } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";

const days = ["월", "화", "수", "목", "금"];
const { dayNum: today } = getToday();

export default function TimeTable() {
  const [_date, _setDate] = useState([0, 0, 0]);
  const { theme } = useThemeStore();

  const { data: tableData } = useQuery({
    queryKey: [queryKeys.timeTable, "schedule"],
    queryFn: () => get(`${path.timeTable}/week`),
    select: (res) => res?.data,
  });

  return (
    <Carousel height="100" first={today !== 6 && today !== 0 ? today - 1 : 0}>
      {tableData?.map((dayData, index) => (
        <View key={index} style={{ gap: 20 }}>
          <Text style={[font.label[1], { color: theme.Gray[900] }]}>
            {`${days[index]}요일`}
          </Text>
          <FlatList
            data={dayData.timetables}
            renderItem={({ item, index }) => (
              <Subject
                index={index + 1}
                name={item.subject_name}
                icon={item.image}
              />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text style={[font.caption[1], { color: theme.normal.black }]}>
                시간표가 없습니다
              </Text>
            }
          />
        </View>
      ))}
    </Carousel>
  );
}
