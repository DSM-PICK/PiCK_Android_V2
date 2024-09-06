import React, { useState, useRef } from "react";
import { FlatList, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { path, queryKeys } from "@/constants";
import { Carousel } from "@/components/layout";
import Subject from "./subject";
import { font, get, getToday } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";

const days = ["월", "화", "수", "목", "금"];
const { dayNum: today } = getToday();

export default function TimeTables() {
  const [_date, _setDate] = useState([0, 0, 0]);
  const [month, date, day] = _date;
  const isFirst = useRef(true);
  const { theme } = useThemeStore();

  const { data: tableData } = useQuery({
    queryKey: [queryKeys.timeTable, "schedule"],
    queryFn: () => get(`${path.timeTable}/week`),
    select: (res) => res?.data,
  });

  return (
    <Carousel height="100">
      {tableData?.map((dayData, index) => (
        <View key={index} style={{ flex: 1 }}>
          <Text style={[font.label[1], { color: theme.Gray[900] }]}>
            {`${days[day]}요일`}
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
          />
        </View>
      ))}
    </Carousel>
  );
}
