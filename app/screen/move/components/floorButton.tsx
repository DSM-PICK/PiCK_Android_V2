import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import React from "react";
import { TouchableNativeFeedback, View, Text, StyleSheet } from "react-native";

type SelectedType = {
  floor: number;
  classroom_name?: string;
  start?: number;
  end?: number;
};

interface PropType {
  selected?: SelectedType;
  setSelected: (props: SelectedType) => void;
  item: number;
}

export default function FloorButton({ selected, setSelected, item }: PropType) {
  const { floor } = selected!;
  const { theme } = useThemeStore();

  return (
    <TouchableNativeFeedback
      onPress={() => setSelected({ ...selected, floor: item })}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.BG,
            borderBottomWidth: item === floor ? 1 : 0,
            borderBottomColor: theme.Main[400],
          },
        ]}
      >
        <Text
          style={[
            font.body[1],
            {
              color: item === floor ? theme.normal.black : theme.Gray[500],
              textAlign: "center",
            },
          ]}
        >
          {`${item}층`}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "20%",
    paddingVertical: 4,
  },
});
