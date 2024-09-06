import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@/components/common";
import BottomSheet from "../components/common/changeBottomSheet";

export const BottomSheetTestScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const pressButton = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.rootContainer}>
      <Button size="main" onPress={pressButton}>
        열고 닫기
      </Button>
      <BottomSheet
        buttonClick={() => {}}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="픽은 라이트 모드 또는 다크 모드로 변경할 수 있어요"
        content="픽을 다크 모드로 설정 하시겠어요?"
        highlight="다크 모드"
        buttonMessage="다크 모드로 설정하기"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
