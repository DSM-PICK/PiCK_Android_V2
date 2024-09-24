import React from "react";
import Box from "@/components/layout/box";
import { Text } from "react-native";
import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";

interface PropType {
  setVisible: () => void;
  time: string;
  placeholder: string;
  classTime?: boolean;
}

export default function PickerBox({
  classTime,
  setVisible,
  time,
  placeholder,
}: PropType) {
  const { theme } = useThemeStore();

  return (
    <Box width={classTime ? "100%" : 100} onPress={setVisible} rounded="big">
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
