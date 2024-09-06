import React from "react";
import Box from "@/components/layout/box";
import { Text } from "react-native";
import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";

interface PropType {
  setVisible: () => void;
  time: string;
  placeholder: string;
}

export default function PickerBox({ setVisible, time, placeholder }: PropType) {
  const { theme } = useThemeStore();

  return (
    <Box width={100} onPress={setVisible} rounded="big">
      <Text
        style={[
          font.caption[1],
          { color: !!time ? theme.normal.black : theme.Gray[500] },
        ]}
      >
        {!!time ? time.replace(":", " : ") : placeholder}
      </Text>
    </Box>
  );
}
