import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";

interface PropType {
  index: number;
  name: string;
  icon: string;
}

export default function Subject({ index, name, icon }: PropType) {
  const { theme } = useThemeStore();

  console.log(index, name, icon);

  return (
    <View style={styles.flexContainer}>
      <Text style={[{ color: theme.normal.black }, font.subTitle[2]]}>
        <Text style={{ color: theme.Main[500] }}>{index}</Text>교시
      </Text>
      <View style={[styles.flexContainer, { gap: 12 }]}>
        <Image source={{ uri: icon }} style={{ width: 28, height: 28 }} />
        <Text style={[{ color: theme.normal.black }, font.label[1]]}>
          {name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 28,
    paddingVertical: 4,
  },
});
