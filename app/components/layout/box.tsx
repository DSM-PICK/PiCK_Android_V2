import React from "react";
import {
  AnimatableNumericValue,
  DimensionValue,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { propType } from "BoxType";
import useThemeStore from "@/utils/stores/usethemeProp";

const roundedSet = {
  none: 0,
  sm: 4,
  lg: 8,
  big: 12,
  full: "100%",
};

export default function Box({
  rounded = "sm",
  width,
  height,
  children,
  paddingHorizontal,
  onPress,
  padding,
}: propType) {
  const style: StyleProp<ViewStyle> = {
    width: width as DimensionValue,
    height: height as DimensionValue,
    padding: (padding as DimensionValue) || 12,
    paddingHorizontal: (paddingHorizontal as DimensionValue) || 16,
    borderRadius: roundedSet[rounded] as AnimatableNumericValue,
    justifyContent: "center",
  };
  const { theme } = useThemeStore();
  return (
    <TouchableOpacity
      style={[style, { backgroundColor: theme.Gray[50] }]}
      onPress={onPress}
      activeOpacity={!!onPress ? 0.6 : 1}
    >
      {children}
    </TouchableOpacity>
  );
}
