import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PassInfoBox from "./passinfoBox";
import { font, get } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import { useQuery } from "@tanstack/react-query";
import { path, queryKeys } from "@/constants";
import BasicProfile from "@/assets/icons/basicProfile";
import { PickLogo } from "@/assets/icons";
import { Button } from "@/components/common";

interface PassType {
  type: "out" | "earlyReturn";
}

export default function Pass({ type }: PassType) {
  const { theme } = useThemeStore();

  const { data } = useQuery({
    queryKey: queryKeys.apply,
    queryFn: () => get(`${path[type === "out" ? "out" : "earlyReturn"]}/my`),
    select: (res) => res?.data,
  });

  console.log(data);

  return (
    <View
      style={[
        { backgroundColor: theme.BG, padding: 24, borderRadius: 15, gap: 24 },
      ]}
    >
      <Text style={[font.subTitle[1], { color: theme.normal.black }]}>
        외출증
      </Text>
      <View style={{ flexDirection: "row", gap: 100 }}>
        <View>
          <Text style={[font.heading[2], { color: theme.normal.black }]}>
            {data?.user_name}
          </Text>
          <Text style={[font.subTitle[3], { color: theme.Gray[700] }]}>
            {data?.grade}학년 {data?.class_num}반 {data?.num}번
          </Text>
        </View>
        <BasicProfile face={theme.Main[400]} body={theme.Gray[50]} />
      </View>
      <View>
        <PassInfoBox
          title="외출 시간"
          content={
            data?.end ? `${data?.start} ~ ${data?.end}` : `${data?.start} ~ `
          }
        />
        <PassInfoBox title="사유" content={data?.reason} />
        <PassInfoBox
          title="확인 교사"
          content={data?.teacher_name + " 선생님"}
        />
      </View>
      <View style={{ alignSelf: "center" }}>
        <PickLogo face={theme.normal.black} body={theme.Main[500]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
