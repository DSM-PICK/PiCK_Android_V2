import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface SelfListProps {
  floor: number;
  teacher: string;
}

export default function SelfListBox({ floor, teacher }: SelfListProps) {
  const { theme } = useThemeStore();
  return (
    <View style={[styles.container]}>
      <Text style={[font.body[1], { color: theme.Gray[800] }]}>{floor}층</Text>
      <Text style={[font.body[1], { color: theme.normal.black }]}>
        {teacher} 선생님
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 16,
    justifyContent: "space-between",
  },
});
