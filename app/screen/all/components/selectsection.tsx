import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import React from "react";
import { Text, View } from "react-native";

interface SelectSectionProps {
  title: string;
  children: React.ReactElement;
}

export const SelectSection = ({ title, children }: SelectSectionProps) => {
  const { theme } = useThemeStore();
  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={[
          font.label[1],
          {
            paddingVertical: 12,
            color: theme.Gray[600],
          },
        ]}
      >
        {title}
      </Text>
      <View>{children}</View>
    </View>
  );
};
