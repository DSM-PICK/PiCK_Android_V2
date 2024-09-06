import useThemeStore from "@/utils/stores/usethemeProp";
import React, { useEffect, useState } from "react";
import { Animated, Easing, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  isOn: boolean;
  onPress: () => void;
};

const Toggle = ({ isOn, onPress }: Props) => {
  const [animatedValue] = useState(new Animated.Value(isOn ? 1 : 0));
  const { theme } = useThemeStore();

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isOn, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 31],
  });

  const color = isOn ? theme.Main[500] : theme.Gray[100];

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[styles.toggleContainer, { backgroundColor: color }]}
    >
      <Animated.View
        style={[
          styles.toggleWheel,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default Toggle;

const styles = StyleSheet.create({
  toggleContainer: {
    width: 60,
    height: 32,
    borderRadius: 40,
    justifyContent: "center",
  },
  toggleWheel: {
    width: 26,
    height: 26,
    backgroundColor: "white",
    borderRadius: 99,
  },
});
