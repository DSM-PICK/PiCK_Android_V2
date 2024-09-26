import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "@/components/common/header";
import { useQuery } from "@tanstack/react-query";
import { path, queryKeys } from "@/constants/querykey";
import { get } from "@/utils/function/api";
import { font, getToken } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import BasicProfile from "@/assets/icons/basicProfile";
import TimeTable from "./components/TimeTable";
import { TodaySelfStudyList } from "./components/selfstudylist";
import { Notice } from "./components/notice";
import { Meal } from "./components/meals";
import useViewSettingStore from "@/utils/stores/useViewSetting";
import Pass from "./components/pass";
import MealNotice from "./components/mealNotice";

export const Home = () => {
  const texts = ["학년", "반", "번", ""];
  const { view } = useViewSettingStore();
  const [webSocketData, setWebSocketData] = useState<any>(null);

  const { data: MealNoticeData } = useQuery({
    queryKey: queryKeys.weekendMeal,
    queryFn: () => get(`${path.weekendMeal}/period`),
    select: (res) => res?.data,
  });

  console.log(MealNoticeData);

  const { data: simpleData } = useQuery({
    queryKey: queryKeys.simple,
    queryFn: () => get(`${path.user}/simple`),
    select: (res) => {
      const { class_num, grade, num, user_name } = res?.data;
      return [grade, class_num, num, user_name];
    },
  });

  const { theme } = useThemeStore();
  useEffect(() => {
    const Socket = async () => {
      const { accessToken } = await getToken();
      const ws = new WebSocket(
        `https://prod-server.xquare.app/dsm-pick/main`,
        null,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      ws.onopen = () => {
        ws.send("");
        console.log("WebSocket 연결 성공");
      };

      ws.onerror = (error) => {
        console.log("WebSocket 오류:", error);
      };

      ws.onmessage = function (data) {
        console.log("서버로부터 메시지 받음");
        const dataJSON = JSON.parse(data.data);
        setWebSocketData(dataJSON);
      };
    };

    Socket();
  }, []);

  return (
    <ScrollView style={{ flex: 1, height: "100%" }}>
      <View
        style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1 }}
      >
        <Header />
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
        <View style={[style.profileContainer]}>
          <MealNotice
            type={MealNoticeData?.status}
            data={MealNoticeData && MealNoticeData}
          />
          <View style={style.realProfileContainer}>
            <BasicProfile face={theme.Main[400]} body={theme.Gray[50]} />
            <View>
              <Text style={[font.label[1], { color: theme.normal.black }]}>
                대덕소프트웨어마이스터고등학교
              </Text>
              <Text style={[font.label[1], { color: theme.normal.black }]}>
                {simpleData?.map((item, index) => item + texts[index] + " ")}
              </Text>
            </View>
          </View>
          {webSocketData && webSocketData?.type && (
            <Pass type={webSocketData?.type} data={webSocketData} />
          )}

          <View style={[{ paddingHorizontal: 24, gap: 32 }]}>
            {view === "timetable" ? <TimeTable /> : <Meal />}
            <TodaySelfStudyList />
            <Notice />
          </View>
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
    paddingHorizontal: 24,
  },
});
