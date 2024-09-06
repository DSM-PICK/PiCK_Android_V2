import { Button } from "@/components/common";
import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

interface ApplicationBoxProps {
  title: string;
  explane: string;
  Icon: React.ReactElement;
  selected: boolean;
  onPress: () => void;
  buttonOnPress: () => void;
  buttonMessage: string;
}

export const CustomBox = ({
  Icon,
  title,
  explane,
  selected,
  onPress,
  buttonOnPress,
  buttonMessage,
}: ApplicationBoxProps) => {
  const { theme } = useThemeStore();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: theme.BG,
          borderWidth: 1,
          borderColor: selected ? theme.Main[500] : theme.Gray[50],
          borderRadius: 8,
        },
        styles.container,
      ]}
    >
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View>{Icon}</View>
        <Text style={[font.label[1], { color: theme.normal.black }]}>
          {title}
        </Text>
      </View>
      {selected && (
        <>
          <Text style={[font.body[2], { color: theme.Gray[800] }]}>
            {explane}
          </Text>
          <Button size="application" onPress={buttonOnPress}>
            {buttonMessage}
          </Button>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 16,
    padding: 16,
  },
});
