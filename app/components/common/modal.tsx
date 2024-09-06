import React from "react";
import { Modal as ModalView, StyleSheet, View } from "react-native";
import { PropType } from "ModalType";
import Button from "./button";
import Box from "../layout/box";
import { HiddenView } from "../layout";
import useThemeStore from "@/utils/stores/usethemeProp";

const textSet = [
  { cancel: "취소", accept: "선택 완료" },
  { cancel: "취소", accept: "신청" },
  { cancel: "아니요", accept: "예" },
  { cancel: undefined, accept: "확인" },
];

export default function Modal({
  type,
  visible,
  onAccept,
  children,
  setVisible,
}: PropType) {
  const { theme } = useThemeStore();
  const { accept } = textSet[type];

  const handleAccept = () => {
    setVisible(false);
    setTimeout(() => {
      onAccept();
    }, 200);
  };

  return (
    <ModalView
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <View style={[styles.container, { backgroundColor: theme.BG }]}>
        <View style={styles.contentContainer}>
          <View style={{ width: "100%" }}>{children}</View>
          <Button onPress={handleAccept} size="main">
            {accept}
          </Button>
        </View>
      </View>
    </ModalView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    position: "absolute",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    width: "100%",
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
    gap: 28,
  },
});
