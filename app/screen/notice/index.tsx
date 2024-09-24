import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { queryKeys, path } from "@/constants";
import { font, get } from "@/utils";
import NoticeBox from "./components/noticeBox";
import Back from "@/assets/icons/backIcon";
import useThemeStore from "@/utils/stores/usethemeProp";
import { useNavigation } from "@react-navigation/native";

export const Notice = () => {
  const { theme } = useThemeStore();
  const navigation = useNavigation();
  const { data: noticeData } = useQuery({
    queryKey: queryKeys.notice,
    queryFn: () => get(`${path.notice}/simple`),
    select: (res) => res?.data,
  });

  return (
    <View style={{ backgroundColor: theme.BG, height: "100%" }}>
      <View style={styles.header}>
        <Pressable style={styles.Icon} onPress={() => navigation.goBack()}>
          <Back Fill={theme.normal.black} />
        </Pressable>
        <Text style={[font.body[1], { color: theme.normal.black }]}>
          공지사항
        </Text>
        <View style={styles.Icon} />
      </View>
      <View>
        <FlatList
          overScrollMode="never"
          ItemSeparatorComponent={() => (
            <View style={styles.separatorElement} />
          )}
          data={noticeData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <NoticeBox title={item.title} date={item.create_at} id={item.id} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  separatorElement: {
    width: "100%",
    height: 0.5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 12,
  },
  Icon: {
    width: 24,
    height: 24,
  },
});
