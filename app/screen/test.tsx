import useThemeStore from "@/utils/stores/usethemeProp";
import React from "react";
import { Text, View } from "react-native";

const Test = () => {
  const { theme } = useThemeStore();
  return (
    <View style={{ backgroundColor: theme.Main[400] }}>
      <Text>qvdknjwe</Text>
    </View>
  );
};

export default Test;
