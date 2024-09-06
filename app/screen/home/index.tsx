import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "@/components/common/header";
import { useQuery } from "@tanstack/react-query";
import { path, queryKeys } from "@/constants/querykey";
import { get } from "@/utils/function/api";
import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import BasicProfile from "@/assets/icons/basicProfile";
import TimeTable from "./components/TimeTable";
import { TodaySelfStudyList } from "./components/selfstudylist";
import { Notice } from "./components/notice";
import { Meal } from "./components/meals";
import useViewSettingStore from "@/utils/stores/useViewSetting";

export const Home = ({ navigation, route }: any) => {
  const texts = ["학년", "반", "번", ""];
  const { view } = useViewSettingStore();

  const { data: simpleData } = useQuery({
    queryKey: queryKeys.simple,
    queryFn: () => get(`${path.user}/simple`),
    select: (res) => {
      const { class_num, grade, num, name } = res?.data;
      return [grade, class_num, num, name];
    },
  });

  const { theme } = useThemeStore();

  return (
    <ScrollView style={{ flex: 1, height: "100%" }}>
      <View
        style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1 }}
      >
        <Header router={route.name} />
      </View>
      <ScrollView
        contentContainerStyle={[
          {
            backgroundColor: theme.BG,
            height: "100%",
          },
          style.contentContainer,
        ]}
      >
        <View style={[{ padding: 24 }, style.profileContainer]}>
          <View style={style.realProfileContainer}>
            <BasicProfile face={theme.Gray[50]} body={theme.Main[400]} />
            <View>
              <Text style={[font.label[1], { color: theme.normal.black }]}>
                대덕소프트웨어마이스터고등학교
              </Text>
              <Text style={[font.label[1], { color: theme.normal.black }]}>
                {simpleData?.map((item, index) => item + texts[index] + " ")}
              </Text>
            </View>
          </View>
          {view === "timetable" ? <TimeTable /> : <Meal />}
          <TodaySelfStudyList />
          <Notice />
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  contentContainer: {
    paddingTop: 64,
    gap: 32,
  },

  profileContainer: {
    flexDirection: "column",
    gap: 32,
  },
  realProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    paddingVertical: 12,
  },
});
