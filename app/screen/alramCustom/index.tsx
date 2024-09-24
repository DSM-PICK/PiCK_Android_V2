import Back from "@/assets/icons/backIcon";
import { font, get } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AlarmBox } from "./box";
import { useQuery } from "@tanstack/react-query";
import { path, queryKeys } from "@/constants";

export const AlarmCustom = () => {
  const { theme } = useThemeStore();

  const { data: alarmData } = useQuery({
    queryKey: queryKeys.notification,
    queryFn: () => get(`${path.notification}/my-subscribe`),
    select: (res) => res?.data?.subscribe_topic_response || [],
  });

  const initialState = alarmData
    ? {
        out:
          alarmData.find((topic) => topic.topic === "EARLY_RETURN")
            ?.is_subscribed || false,
        classMove:
          alarmData.find((topic) => topic.topic === "APPLICATION")
            ?.is_subscribed || false,
        notice:
          alarmData.find((topic) => topic.topic === "NEW_NOTICE")
            ?.is_subscribed || false,
        weekendMeal:
          alarmData.find((topic) => topic.topic === "WEEKEND_MEAL")
            ?.is_subscribed || false,
      }
    : {
        out: false,
        classMove: false,
        notice: false,
        weekendMeal: false,
      };

  const [on, setOn] = useState(initialState);
  const [allOn, setAllOn] = useState<boolean>(false);

  const Check = () => {
    if (on.out && on.classMove && on.notice && on.weekendMeal) {
      setAllOn(true);
    } else {
      setAllOn(false);
    }
  };

  const handleAllToggle = () => {
    const newValue = !allOn;
    setAllOn(newValue);
    setOn({
      out: newValue,
      classMove: newValue,
      notice: newValue,
      weekendMeal: newValue,
    });
  };

  const handleToggle = (key: keyof typeof on) => {
    setOn((prevState) => {
      const newState = { ...prevState, [key]: !prevState[key] };
      return newState;
    });
  };

  useEffect(() => {
    if (alarmData) {
      setOn(initialState);
    }
  }, [alarmData]);

  useEffect(() => {
    Check();
  }, [on]);

  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: theme.BG,
        paddingTop: 44,
        height: "100%",
      }}
    >
      <View style={styles.header}>
        <Pressable style={styles.Icon} onPress={() => navigation.goBack()}>
          <Back Fill={theme.normal.black} />
        </Pressable>
        <Text style={[font.body[1], { color: theme.normal.black }]}>
          알림 설정
        </Text>
        <View style={styles.Icon} />
      </View>
      <View style={{ paddingTop: 28, gap: 24 }}>
        <AlarmBox title="전체" isOn={allOn} onPress={handleAllToggle} />
        <View style={{ backgroundColor: theme.Gray[50], height: 8 }} />
        <View style={{ gap: 12 }}>
          <View style={{ paddingHorizontal: 24, gap: 12, paddingVertical: 16 }}>
            <Text style={[font.heading[4], { color: theme.normal.black }]}>
              맟춤 알림
            </Text>
            <Text style={[font.body[1], { color: theme.Gray[500] }]}>
              원하시는 알림을 설정하면 원하는 알림만 보내드릴게요.
            </Text>
          </View>
          <AlarmBox
            title="외출 상태 변경"
            isOn={on.out}
            onPress={() => handleToggle("out")}
          />
          <AlarmBox
            title="교실 이동 상태 변경"
            isOn={on.classMove}
            onPress={() => handleToggle("classMove")}
          />
          <AlarmBox
            title="새로운 공지 등록"
            isOn={on.notice}
            onPress={() => handleToggle("notice")}
          />
          <AlarmBox
            title="주말 급식 신청기간"
            isOn={on.weekendMeal}
            onPress={() => handleToggle("weekendMeal")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 24,
  },
  Icon: {
    width: 24,
    height: 24,
  },
});
