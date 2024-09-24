import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface InfoProps {
  title: string;
  content: string;
}

export default function PassInfoBox({ title, content }: InfoProps) {
  const { theme } = useThemeStore();
  return (
    <View style={[styles.container]}>
      <Text style={[font.body[2], { color: theme.Gray[700] }]}>{title}</Text>
      <Text style={[font.subTitle[3], { color: theme.normal.black }]}>
        {content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    gap: 12,
  },
});
