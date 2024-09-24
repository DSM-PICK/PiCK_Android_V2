import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PropType {
  type: "name" | "birth" | "num" | "id";
  data: string;
}

const fontType = ["body", 2];
const typeSet = {
  name: "이름",
  birth: "생년월일",
  num: "학번",
  id: "아이디",
};

export default function InfoBox({ type, data }: PropType) {
  const { theme } = useThemeStore();
  return (
    <View style={styles.container}>
      <Text style={[font.body[1], { color: theme.Gray[800] }]}>
        {typeSet[type]}
      </Text>
      <Text style={[font.body[1], { color: theme.normal.black }]}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
