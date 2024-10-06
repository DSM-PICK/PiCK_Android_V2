import React from "react";
import Box from "@/components/layout/box";
import { Text, View } from "react-native";
import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import useTimePickerSetting from "@/utils/stores/useTimePickerSetting";

interface PropType {
  setVisible: () => void;
  time: string;
  placeholder: string;
  classT?: boolean;
}

export default function PickerBox({ classT, setVisible, time, placeholder }: PropType) {
  const { theme } = useThemeStore();
  const { Picker } = useTimePickerSetting();

  return (
    <Box width={classT ? "100%" : 100} onPress={setVisible} rounded="big">
      {classT ? (
        <View style={{ flexDirection: "row", gap: 40, justifyContent: "center" }}>
          {time !== "undefined||undefined" ? (
            <>
              <View style={{ flexDirection: "row", gap: 10, justifyContent: "center" }}>
                <Text
                  style={[
                    font.caption[1],
                    { color: !!time ? theme.normal.black : theme.Gray[500] },
                  ]}
                >
                  {time.split("||")[0]}
                </Text>
                <Text style={[font.caption[1], { color: theme.Gray[400] }]}>부터</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 10, justifyContent: "center" }}>
                <Text
                  style={[
                    font.caption[1],
                    { color: !!time ? theme.normal.black : theme.Gray[500] },
                  ]}
                >
                  {time.split("||")[1]}
                </Text>
                <Text style={[font.caption[1], { color: theme.Gray[400] }]}>까지</Text>
              </View>
            </>
          ) : (
            <Text
              style={[font.caption[1], { color: !!time ? theme.normal.black : theme.Gray[500] }]}
            >
              {placeholder}
            </Text>
          )}
        </View>
      ) : (
        <Text style={[font.caption[1], { color: !!time ? theme.normal.black : theme.Gray[500] }]}>
          {!!time ? time.replace(":", " : ") : placeholder}
        </Text>
      )}
    </Box>
  );
}
