import { DownArrow } from "@/assets/icons";
import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from "react-native";
import Button from "./button";
import useThemeStore from "@/utils/stores/usethemeProp";
import { font } from "@/utils";

interface BottomSheetProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  content: string;
  highlight: string;
  buttonMessage: string;
  buttonClick: () => void;
}

const BottomSheet = ({
  modalVisible,
  setModalVisible,
  title,
  content,
  highlight,
  buttonClick,
  buttonMessage,
}: BottomSheetProps) => {
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const { theme } = useThemeStore();
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    })
  ).current;

  const onPress = () => {
    buttonClick();
    closeModal();
  };

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  return (
    <Modal
      visible={modalVisible}
      animationType={"fade"}
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{ translateY: translateY }],
            backgroundColor: theme.BG,
          }}
          {...panResponders.panHandlers}
        >
          <DownArrow onPress={closeModal} style={{ alignSelf: "center" }} />
          <View style={{ gap: 12 }}>
            <Text style={[font.subTitle[2], { color: theme.normal.black }]}>
              {content}
            </Text>
            <Text style={[font.label[2], { color: theme.normal.black }]}>
              {title}
            </Text>
          </View>
          <Button size="main" onPress={onPress}>
            {buttonMessage}
          </Button>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 48,
    gap: 34,
  },
});

export default BottomSheet;
