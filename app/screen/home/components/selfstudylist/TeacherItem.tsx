import React from "react";
import { HiddenView } from "@/components/layout";
import { StyleSheet, Text, View } from "react-native";
import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";

interface PropType {
  item: {
    floor: string;
    teacher_name: string;
  };
}

export const TeacherItem = ({ item }: PropType) => {
  const { theme } = useThemeStore();
  return (
    <HiddenView data={item !== undefined}>
      <View key={item.floor} style={styles.container}>
        <Text style={[font.label[2], { color: theme.Main[900] }]}>
          {item.floor}층
        </Text>
        <Text style={[font.subTitle[3], { color: theme.normal.black }]}>
          {item.teacher_name} 선생님
        </Text>
      </View>
    </HiddenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
});
