import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Modal from "../modal";
import ScrollPicker from "../scrollPicker";
import useThemeStore from "@/utils/stores/usethemeProp";
import { font } from "@/utils";
import useTimePickerSetting from "@/utils/stores/useTimePickerSetting";

interface PropType {
  visible: [boolean, string];
  setVisible: (visible: any) => void;
  onDone: (time: any, type: string) => void;
  Stringtype: string;
  classTime?: boolean;
}

const defaultData = { hour: "08", minute: "00" };

export default function TimePicker({
  visible,
  setVisible,
  onDone,
  Stringtype,
  classTime,
}: PropType) {
  const { theme } = useThemeStore();
  const { Picker } = useTimePickerSetting();
  const [time, setTime] = useState(defaultData);
  const { hour, minute } = time;

  const handleScroll = (item: string, id: string) => {
    setTime({ ...time, [id]: item.toString() });
  };

  return (
    <Modal
      type={0}
      visible={visible[0]}
      onAccept={() => {
        onDone(`${hour}:${minute}`, visible[1]);
        setTime(defaultData);
      }}
      setVisible={(res) => setVisible([res, ""])}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: 32,
          }}
        >
          <Text
            style={[
              font.label[1],
              {
                color: theme.normal.black,
                alignSelf: "flex-start",
              },
            ]}
          >
            {Stringtype} {classTime ? "교시" : "시간"}을 선택해주세요
          </Text>
          {Picker === "time" ? (
            <View style={[styles.timeView, { gap: 32 }]}>
              <View style={[styles.timeView, { gap: 24 }]}>
                <ScrollPicker
                  items={Array.from(new Array(16).keys()).map((i) =>
                    (i + 8).toString().padStart(2, "0")
                  )}
                  onScroll={handleScroll}
                  id="hour"
                />
                <Text style={[font.subTitle[1], { color: theme.normal.black }]}>
                  시
                </Text>
              </View>
              <Text style={[font.heading[3], { color: theme.normal.black }]}>
                -
              </Text>
              <View style={[styles.timeView, { gap: 24 }]}>
                <ScrollPicker
                  items={Array.from(new Array(60).keys()).map((i) =>
                    i.toString().padStart(2, "0")
                  )}
                  onScroll={handleScroll}
                  id="minute"
                />
                <Text style={[font.subTitle[1], { color: theme.normal.black }]}>
                  분
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 30,
              }}
            >
              <ScrollPicker
                items={Array.from(new Array(10).keys()).map((i) => `${i + 1}`)}
                onScroll={handleScroll}
                id="hour"
              />
              <Text style={[font.subTitle[1], { color: theme.normal.black }]}>
                교시
              </Text>
              <Text>~</Text>
              <ScrollPicker
                items={Array.from(new Array(10).keys()).map((i) => `${i + 1}`)}
                onScroll={handleScroll}
                id="minute"
              />
              <Text style={[font.subTitle[1], { color: theme.normal.black }]}>
                교시
              </Text>
            </View>
          )}
          <View
            style={[styles.highlightLine, { backgroundColor: theme.Main[50] }]}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  timeView: {
    flexDirection: "row",
    alignItems: "center",
  },
  highlightLine: {
    position: "absolute",
    top: "52%",
    zIndex: -1,
    width: "100%",
    height: 40,
    borderRadius: 12,
  },
});
