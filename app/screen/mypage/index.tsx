import React from "react";
import { useQuery } from "@tanstack/react-query";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { queryKeys, path } from "@/constants";
import { get, font } from "@/utils";
import InfoBox from "./components/infoBox";
import useThemeStore from "@/utils/stores/usethemeProp";
import Back from "@/assets/icons/backIcon";
import BasicProfile from "@/assets/icons/basicProfile";

const dateType = ["년", "월", "일"];

export const My = ({ navigation }) => {
  const { theme } = useThemeStore();

  const { data: detailData } = useQuery({
    queryKey: queryKeys.detail,
    queryFn: () => get(`${path.user}/details`),
    select: (res) => {
      let { data } = res;
      data = { ...data, birth_day: data.birth_day.split("-") };
      return data;
    },
  });

  console.log(detailData);

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: theme.BG,
        paddingHorizontal: 24,
      }}
    >
      <View style={styles.header}>
        <Pressable style={styles.Icon} onPress={() => navigation.goBack()}>
          <Back Fill={theme.normal.black} />
        </Pressable>
        <Text style={[font.body[1], { color: theme.normal.black }]}>
          마이페이지
        </Text>
        <View style={styles.Icon} />
      </View>
      <View style={styles.container}>
        <View style={[styles.proflie]}>
          <BasicProfile face={theme.Main[400]} body={theme.Gray[50]} />
        </View>
        <InfoBox type="name" data={detailData?.user_name} />
        <InfoBox
          type="birth"
          data={detailData?.birth_day
            ?.map((item: string, index: number) => item + dateType[index])
            .join(" ")}
        />
        <InfoBox
          type="num"
          data={`${detailData?.grade}학년 ${detailData?.class_num}반 ${detailData?.num}번`}
        />
        <InfoBox type="id" data={detailData?.account_id} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 32,
    paddingVertical: 10,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    marginTop: 42,
    marginBottom: 12,
  },
  Icon: {
    width: 24,
    height: 24,
  },
  proflie: {
    marginTop: 40,
    marginBottom: 82,
  },
});
