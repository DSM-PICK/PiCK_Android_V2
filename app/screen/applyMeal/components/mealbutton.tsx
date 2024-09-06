import useThemeStore from "@/utils/stores/usethemeProp";
import React from "react";
import { Text, View } from "react-native";

interface PropType {
  setVisible: ([boolean, string]) => void;
  visible: [boolean, string];
  value: string;
  id: string;
  text: string;
}

const buttonOptions = {
  size: "auto",
  fontType: ["button", "ES"],
};

export default function MealButton({
  setVisible,
  value,
  id,
  text,
  visible,
}: PropType) {
  const { theme } = useThemeStore();

  return (
    <Text
      onPress={() => setVisible([true, id])}
      id={id}
      style={{
        color: visible[1] === id ? theme.normal.white : theme.Gray[400],
        backgroundColor: visible[1] === id ? theme.Main[500] : theme.Gray[100],
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
      }}
      {...(buttonOptions as any)}
    >
      {text}
    </Text>
  );
}
