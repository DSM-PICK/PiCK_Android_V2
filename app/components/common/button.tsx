import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import React from "react";
import {
  Text,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface ButtonProps {
  size: "main" | "application";
  children: string;
  disabled?: boolean;
  onPress: (e?: GestureResponderEvent, id?: string) => void;
  id?: string;
}

export default function Button({
  size,
  children,
  disabled,
  onPress,
  id,
}: ButtonProps) {
  const { theme } = useThemeStore();

  return (
    <TouchableOpacity
      onPress={(e) => onPress(e, id)}
      style={[
        styles.container,
        {
          backgroundColor: disabled ? theme.Main[100] : theme.Main[700],
          width: "100%",
          padding: size === "main" ? 14 : 8,
        },
      ]}
      disabled={disabled}
    >
      <Text
        style={[styles.text, { color: theme.normal.white }, font.subTitle[2]]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 60,
    borderRadius: 8,
  },
  text: {
    textAlign: "center",
  },
});
