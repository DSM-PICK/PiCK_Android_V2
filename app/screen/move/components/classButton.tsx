import useThemeStore from "@/utils/stores/usethemeProp";
import React from "react";
import { TouchableNativeFeedback, Text, View, StyleSheet } from "react-native"; // Imported necessary components

type SelectedType = {
  floor: number;
  classroom_name: string | undefined;
  start?: number;
  end?: number;
};

interface PropType {
  width: number;
  selected: SelectedType;
  setSelected: (props: SelectedType) => void;
  item: string;
}

export default function ClassButton({
  width,
  selected,
  setSelected,
  item,
}: PropType) {
  const { classroom_name: className } = selected;
  const { theme } = useThemeStore();

  return (
    <TouchableNativeFeedback
      onPress={() => {
        setSelected({
          ...selected,
          classroom_name: className === item ? undefined : item,
        });
      }}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: className === item ? theme.Main[100] : theme.BG,
            borderColor: theme.Main[100],
          },
        ]}
      >
        <Text style={{ color: theme.normal.black, textAlign: "center" }}>
          {item}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
  },
});
