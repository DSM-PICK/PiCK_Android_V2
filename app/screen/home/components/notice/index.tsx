import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SimpleNotice from "./simpleNotice";
import { font, get } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import { useQuery } from "@tanstack/react-query";
import { path, queryKeys } from "@/constants";
import { useNavigation } from "@react-navigation/native";

export const Notice = () => {
  const navigation = useNavigation();
  const { data: noticeData } = useQuery({
    queryKey: queryKeys.notice,
    queryFn: () => get(`${path.notice}/simple`),
    select: (res) => res?.data,
  });
  const { theme } = useThemeStore();
  return (
    <View style={style.container}>
      <View style={style.TopText}>
        <Text style={[font.label[1], { color: theme.Gray[700] }]}>
          최신공지
        </Text>
        <Text
          style={[font.label[1], { color: theme.Gray[700] }]}
          onPress={() => navigation.navigate("공지" as never)}
        >
          더보기
        </Text>
      </View>
      <View>
        <FlatList
          overScrollMode="never"
          data={noticeData}
          ListEmptyComponent={() => (
            <Text style={{ color: theme.normal.black }}>
              공지사항이 없습니다
            </Text>
          )}
          renderItem={({ item }) => (
            <SimpleNotice
              title={item.title}
              date={item.create_at}
              id={item.id}
            />
          )}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 12,
  },
  TopText: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
});
