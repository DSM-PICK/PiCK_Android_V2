import TernaryView from "@/components/layout/TernaryView";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MealButton from "./components/mealbutton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { path, queryKeys } from "@/constants";
import { font, get, getToday, patch, useToast } from "@/utils";
import { Button } from "@/components/common";
import Back from "@/assets/icons/backIcon";
import useThemeStore from "@/utils/stores/usethemeProp";
import { useNavigation } from "@react-navigation/native";

const { month, date } = getToday();

export const WeekendMealApply = () => {
  const [visible, setVisible] = useState<[boolean, string]>([false, "NO"]);
  const queryClient = useQueryClient();
  const { theme } = useThemeStore();
  const navigation = useNavigation();
  const toast = useToast();

  const { data: weekendMealData } = useQuery({
    queryKey: queryKeys.weekendMeal,
    queryFn: () => get(`${path.weekendMeal}/my`),
    select: (res) => res?.data.status,
  });

  useEffect(() => {
    if (weekendMealData) {
      setVisible([true, weekendMealData]);
    }
  }, [weekendMealData]);

  const { mutate: weekendMealMutate } = useMutation({
    mutationFn: (id: string) =>
      patch(`${path.weekendMeal}/my-status?status=${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.weekendMeal });
      navigation.reset({ routes: [{ name: "신청" as never }] });
      toast.success("주말급식 신청이 완료되었습니다!");
    },
    onError: () => toast.error("주말급식 신청을 실패하였습니다!"),
  });

  const { data: ApplyDateData } = useQuery({
    queryKey: [queryKeys.weekendMeal],
    queryFn: () => get(`${path.weekendMeal}/application`),
    select: (res) => res?.data,
  });

  return (
    <View
      style={[
        styles.gapContainer,
        { backgroundColor: theme.BG, paddingTop: 44, height: "100%" },
      ]}
    >
      <View style={styles.header}>
        <Pressable style={styles.Icon} onPress={() => navigation.goBack()}>
          <Back Fill={theme.normal.black} />
        </Pressable>
        <Text style={[font.body[1], { color: theme.normal.black }]}>
          주말 급식 신청
        </Text>
        <View style={styles.Icon} />
      </View>
      <View style={{ gap: 12 }}>
        <Text
          style={[
            font.heading[4],
            { color: theme.normal.black, marginTop: 20 },
          ]}
        >
          주말 급식 신청
        </Text>
        <Text style={[font.caption[2], { color: theme.Gray[500] }]}>
          신청 여부는 담임 선생님이 확인 후 영양사 선생님에게 전달돼요.
        </Text>
        <View style={styles.endMealBoxContainer}>
          <TernaryView
            data={ApplyDateData?.status}
            onTrue={
              <View
                style={[
                  styles.applyContainer,
                  { backgroundColor: theme.Gray[50] },
                ]}
              >
                <Text style={[font.body[1], { color: theme.normal.black }]}>
                  {ApplyDateData?.month}월 주말 급식 신청
                </Text>
                <View style={[styles.buttonContainer]}>
                  <MealButton
                    setVisible={setVisible}
                    id="OK"
                    text=" 신청 "
                    visible={visible}
                  />
                  <MealButton
                    setVisible={setVisible}
                    id="NO"
                    text="미신청"
                    visible={visible}
                  />
                </View>
              </View>
            }
            onFalse={
              <View
                style={[
                  { backgroundColor: theme.Gray[50] },
                  styles.applyContainer,
                ]}
              >
                <Text style={[font.body[1], { color: theme.normal.black }]}>
                  신청 기간이 아닙니다.
                </Text>
              </View>
            }
          />
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 28,
          width: "100%",
          paddingVertical: 24,
          alignSelf: "center",
        }}
      >
        <Button
          onPress={() => {
            weekendMealMutate(visible[1]);
          }}
          size="main"
          disabled={!ApplyDateData?.status}
        >
          저장하기
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gapContainer: {
    paddingHorizontal: 24,
  },
  endMealBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    gap: 5,
    flexDirection: "row",
  },
  applyContainer: {
    justifyContent: "space-between",
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  Icon: {
    width: 24,
    height: 24,
  },
});
