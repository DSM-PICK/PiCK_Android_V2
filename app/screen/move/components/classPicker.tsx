import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Modal from "@/components/common/modal";
import ScrollPicker from "@/components/common/scrollPicker";
import { font, useToast } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";

interface PropType {
  visible: boolean;
  setVisible: (visible: any) => void;
  onDone: (time: any) => void;
}

export default function ClassPicker({ visible, setVisible, onDone }: PropType) {
  const toast = useToast();
  const { theme } = useThemeStore();
  const [time, setTime] = useState({
    start: 1,
    end: 1,
  });

  const handleScroll = (item: string, id: string) => {
    setTime({ ...time, [id]: parseInt(item.replace("교시", "")) });
  };

  const handleAccept = () => {
    if (time.end < time.start) {
      toast.error("올바른 교시를 선택해주세요");
    } else {
      onDone(time);
    }
  };

  return (
    <Modal
      type={0}
      visible={visible}
      onAccept={handleAccept}
      setVisible={setVisible}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text
            style={[
              font.label[1],
              {
                color: theme.normal.black,
                alignSelf: "flex-start",
              },
            ]}
          >
            교실 이동 시간을 선택해주세요
          </Text>
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
              id="start"
            />
            <Text style={[font.subTitle[1], { color: theme.normal.black }]}>
              교시
            </Text>
            <Text>~</Text>
            <ScrollPicker
              items={Array.from(new Array(10).keys()).map((i) => `${i + 1}`)}
              onScroll={handleScroll}
              id="end"
            />
            <Text style={[font.subTitle[1], { color: theme.normal.black }]}>
              교시
            </Text>
          </View>
          <View
            style={[styles.highlightLine, { backgroundColor: theme.Main[50] }]}
          />
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    width: "100%",
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: 32,
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
