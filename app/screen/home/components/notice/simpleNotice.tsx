import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { New, NoticeIcon } from "@icons";
import { font, getDiff } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";

interface PropType {
  title: string;
  date: string;
  id: string;
}

export default function SimpleNotice({ title, date, id }: PropType) {
  const navigation = useNavigation();
  const path = ["상세공지", { id }] as never;

  const _date = getDiff(date);
  const { theme } = useThemeStore();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(...path)}
      style={styles.container}
    >
      <NoticeIcon Fill={theme.Main[300]} />
      <View style={{ gap: 5 }}>
        <View style={styles.titleContainer}>
          <Text style={[font.label[1], { color: theme.normal.black }]}>
            {title?.length > 21 ? title.slice(0, 21) + ".." : title}
          </Text>
          {_date === "오늘" && <New Fill={theme.Main[400]} />}
        </View>
        <Text style={[font.label[2], { color: theme.Gray[600] }]}>{_date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    paddingVertical: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignContent: "center",
    gap: 5,
  },
});
