import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SelectionView from "./components/selectionView";
import {
  AlarmIcon,
  AllIcon,
  BugIcon,
  CardIcon,
  LogOutIcon,
  MyPageIcon,
  SmailIcon,
  SpeakerIcon,
  ViewSettingIcon,
} from "@/assets/icons";
import useThemeStore from "@/utils/stores/usethemeProp";
import { Header } from "@/components/common";
import BasicProfile from "@/assets/icons/basicProfile";
import { useQuery } from "@tanstack/react-query";
import { path, queryKeys } from "@/constants";
import { font, get } from "@/utils";
import { SelectSection } from "./components/selectsection";

export const AllPage = () => {
  const { theme } = useThemeStore();
  const texts = ["학년", "반", "번", ""];
  const { data: simpleData } = useQuery({
    queryKey: queryKeys.simple,
    queryFn: () => get(`${path.user}/simple`),
    select: (res) => {
      const { class_num, grade, num, user_name } = res?.data;
      return [grade, class_num, num, user_name];
    },
  });

  return (
    <ScrollView style={{ height: "100%", backgroundColor: theme.BG }}>
      <View
        style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1 }}
      >
        <Header />
      </View>
      <ScrollView style={style.contentContainer}>
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
        <SelectSection title="도움말">
          <>
            <SelectionView
              Icon={<SmailIcon Fill={theme.Main[600]} />}
              to="자습감독"
              title="자습감독 선생님 확인"
            />
            <SelectionView
              Icon={<SpeakerIcon Fill={theme.Main[600]} />}
              to="공지사항"
              title="공지사항"
            />
            {/* <SelectionView
              Icon={<BugIcon Fill={theme.Main[600]} />}
              to="버그제보"
              title="버그제보"
            /> */}
          </>
        </SelectSection>
        <SelectSection title="설정">
          <>
            <SelectionView
              Icon={<ViewSettingIcon Fill={theme.Main[600]} />}
              to="커스텀"
              title="커스텀"
            />
            {/* <SelectionView
              Icon={<AlarmIcon Fill={theme.Main[600]} />}
              to="알림설정"
              title="알림설정"
            /> */}
          </>
        </SelectSection>
        <SelectSection title="계정">
          <>
            <SelectionView
              Icon={<MyPageIcon Fill={theme.Main[600]} />}
              to="마이페이지"
              title="마이페이지"
            />
            <SelectionView
              Icon={<LogOutIcon Fill={theme.Error} />}
              to="로그아웃"
              title="로그아웃"
            />
          </>
        </SelectSection>
      </ScrollView>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  contentContainer: {
    paddingTop: 64,
    paddingHorizontal: 24,
    backgroundColor: "bule",
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
    marginBottom: 32,
    marginTop: 24,
  },
});
