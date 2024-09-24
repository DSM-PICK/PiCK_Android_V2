import React, { useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Back from "@/assets/icons/backIcon";
import Header from "@/components/common/header";
import TimePicker from "@/components/common/timepicker";
import { font, post, useToast } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import PickerBox from "./components/pickerBox";
import TernaryView from "@/components/layout/TernaryView";
import { Button, Input } from "@/components/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import useTimePickerSetting from "@/utils/stores/useTimePickerSetting";

export const Out = ({ navigation, route }) => {
  const toast = useToast();
  const { Picker } = useTimePickerSetting();
  const queryClient = useQueryClient();
  const [out, setOut] = useState({
    start: undefined,
    end: undefined,
    reason: "",
    application_type: Picker === "time" ? "TIME" : "PERIOD",
  });
  const [pickVisible, setPickVisible] = useState<[boolean, string]>([
    false,
    "",
  ]);
  const { type } = route.params;
  const { theme } = useThemeStore();
  const { start: start, end: end } = out;
  const scrollViewRef = useRef<ScrollView>(null);

  const handleChange = (item: any, type: string) => {
    setOut({ ...out, [type]: item });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const isOut = (item1: any, item2: any) => (type === "외출" ? item1 : item2);
  const disabled = isOut(!!start && !!end, !!start) && out.reason !== "";

  const { mutate: outMutate } = useMutation({
    mutationFn: () =>
      post(isOut("/application", "/early-return/create"), {
        start: out.start,
        end: out.end,
        reason: out.reason,
        application_type: out.application_type,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.anyApply });
      await navigation.reset({ routes: [{ name: "신청" as never }] });
      toast.success(`${type} 신청이 완료되었습니다!`);
    },
    onError: ({ status }: any) => {
      navigation.reset({ routes: [{ name: "신청" as never }] });
      toast.error(
        status === "409" ? "이미 신청되었습니다" : "오류가 발생했습니다"
      );
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[{ backgroundColor: theme.BG }, styles.container]}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Pressable style={styles.Icon} onPress={() => navigation.goBack()}>
              <Back Fill={theme.normal.black} />
            </Pressable>
            <Text style={[font.body[1], { color: theme.normal.black }]}>
              {type} 신청
            </Text>
            <View style={styles.Icon} />
          </View>
          <View style={styles.containerWrap}>
            <Text style={[font.heading[4], { color: theme.normal.black }]}>
              {type} 신청
            </Text>
            <View style={{ gap: 12, marginTop: 24 }}>
              <Text style={[font.label[1], { color: theme.normal.black }]}>
                희망 {type} {Picker === "time" ? "시간" : "교시"}을 선택하세요
              </Text>
              <View>
                <TernaryView
                  data={type === "외출"}
                  onTrue={
                    <>
                      {Picker === "time" ? (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          <PickerBox
                            full
                            setVisible={() => setPickVisible([true, "start"])}
                            time={out.start}
                            placeholder="선택"
                          />
                          <Text
                            style={[
                              font.label[1],
                              { color: theme.normal.black },
                            ]}
                          >
                            부터
                          </Text>
                          <PickerBox
                            full
                            setVisible={() => setPickVisible([true, "end"])}
                            time={out.end}
                            placeholder="선택"
                          />
                          <Text
                            style={[
                              font.label[1],
                              { color: theme.normal.black },
                            ]}
                          >
                            까지
                          </Text>
                        </View>
                      ) : (
                        <PickerBox
                          classTime
                          setVisible={() => setPickVisible([true, "start"])}
                          time={out.start}
                          placeholder="선택"
                        />
                      )}
                    </>
                  }
                  onFalse={
                    <PickerBox
                      full
                      setVisible={() => setPickVisible([true, "start"])}
                      time={start}
                      placeholder="선택"
                    />
                  }
                />
              </View>
            </View>
            <View style={{ marginTop: 68 }}>
              <Input
                label={`${type} 사유를 입력하세요`}
                multiLine={8}
                onChange={({ text }) => {
                  setOut({ ...out, reason: text });
                }}
                value={out.reason}
                placeholder="자세히 입력해주세요"
              />
            </View>
          </View>
        </ScrollView>
        <TimePicker
          Stringtype={pickVisible[1] === "start" ? `${type} 신청` : "외출 복귀"}
          visible={pickVisible}
          setVisible={setPickVisible}
          onDone={handleChange}
          classTime
        />
        <View style={styles.buttonContainer}>
          <Button size="main" onPress={outMutate} disabled={!disabled}>
            신청하기
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  containerWrap: {
    marginTop: 32,
  },
  container: {
    flex: 1,
    paddingTop: 44,
  },
  Icon: {
    width: 24,
    height: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 110,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 24,
  },
});
