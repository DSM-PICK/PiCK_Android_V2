import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { path, queryKeys } from "@/constants";
import { font, get } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import Back from "@/assets/icons/backIcon";
import { useNavigation } from "@react-navigation/native";

export const DetailNotice = ({ route }) => {
  const { theme } = useThemeStore();
  const navigation = useNavigation();
  const { id } = route.params;

  const { data: detailData } = useQuery({
    queryKey: [queryKeys.notice, id],
    queryFn: () => get(`${path.notice}/${id}`),
    select: (res) => res?.data,
  });

  return (
    <View>
      <View style={[styles.container, { backgroundColor: theme.BG }]}>
        <View style={styles.header}>
          <Pressable style={styles.Icon} onPress={() => navigation.goBack()}>
            <Back Fill={theme.normal.black} />
          </Pressable>
          <Text style={[font.body[1], { color: theme.normal.black }]}>
            {detailData?.title}
          </Text>
          <View style={styles.Icon} />
        </View>
        <View style={{ gap: 16 }}>
          <Text style={[font.subTitle[1], { color: theme.normal.black }]}>
            {detailData?.title}
          </Text>
          <View style={[styles.subTitleContainer]}>
            <Text style={[font.body[1], { color: theme.Gray[500] }]}>
              {detailData?.create_at}
            </Text>
            <Text style={[font.body[1], { color: theme.Gray[900] }]}>
              {detailData?.teacher} 선생님
            </Text>
          </View>
        </View>
        <View
          style={[styles.lineElement, { backgroundColor: theme.Gray[50] }]}
        />
        <Text style={[font.body[1], { color: theme.normal.black }]}>
          {detailData?.content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    gap: 15,
    height: "100%",
    paddingHorizontal: 24,
  },
  lineElement: {
    height: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    marginTop: 32,
    marginBottom: 12,
  },
  Icon: {
    width: 24,
    height: 24,
  },
  subTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
