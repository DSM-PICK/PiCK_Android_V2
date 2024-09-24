import { SpeakerIcon } from "@/assets/icons";
import { HiddenView } from "@/components/layout";
import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PropType {
  type: string;
  data: any;
}

function formatDate(dateString: string) {
  if (dateString) {
    const [year, month, day] = dateString.split("-");
    return `${month}월 ${day}일`;
  }
}

export default function MealNotice({ type, data }: PropType) {
  console.log(type, data);
  const { theme } = useThemeStore();
  return (
    <HiddenView data={type}>
      <View style={[styles.container, { backgroundColor: theme.Main[50] }]}>
        <View>
          <SpeakerIcon Fill={theme.normal.black} size="18" />
        </View>
        <Text style={[font.label[2], { color: theme.normal.black }]}>
          <Text>지금은 </Text>
          <Text style={{ color: theme.Main[900] }}>주말 급식 신청 기간</Text>
          <Text>입니다 </Text>
          <Text>
            ({formatDate(data?.start!)}~{formatDate(data?.end!)})
          </Text>
        </Text>
      </View>
    </HiddenView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 30,
  },
});
