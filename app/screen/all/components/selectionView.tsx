import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

interface SelecteViewProps {
  Icon: React.ReactElement;
  title: string;
  to: string | (() => void);
}

export default function SelectionView({ Icon, title, to }: SelecteViewProps) {
  const { theme } = useThemeStore();
  const navigation = useNavigation();
  const navigate: any =
    typeof to === "string"
      ? ([to, { screen: to, type: to }] as never)
      : undefined;

  return (
    <TouchableOpacity
      onPress={() =>
        typeof to === "string"
          ? navigation.navigate(...(navigate as never))
          : to()
      }
      style={[styles.container]}
    >
      {Icon}
      <Text style={(font.label[1], { color: theme.normal.black })}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 16,
    gap: 24,
    alignItems: "center",
  },
});
