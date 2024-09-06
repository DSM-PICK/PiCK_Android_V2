import Toggle from "@/components/common/toggle";
import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AlarmBoxProps {
  onPress: () => void;
  isOn: boolean;
  title: string;
}

export const AlarmBox = ({ onPress, isOn, title }: AlarmBoxProps) => {
  const { theme } = useThemeStore();
  return (
    <View style={styles.container}>
      <Text style={[font.subTitle[1], { color: theme.normal.black }]}>
        {title}
      </Text>
      <Toggle onPress={onPress} isOn={isOn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
