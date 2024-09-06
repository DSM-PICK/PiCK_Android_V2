import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  Text,
} from "react-native";
import React, { useState } from "react";
import { debounce, font } from "@/utils";
import { PropType } from "ScrollPickerType";
import { hitSlop } from "@/constants";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import useThemeStore from "@/utils/stores/usethemeProp";

export default function ScrollPicker({ items, onScroll, id }: PropType) {
  const { theme } = useThemeStore();
  const [before, setBefore] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.ceil(e.nativeEvent.contentOffset.y / 40);
    if (index !== before) {
      setBefore(index);
      impactAsync(ImpactFeedbackStyle.Medium);
    }
    if (!!items[index]) {
      debounce(() => {
        onScroll(items[index], id!);
      }, 10);
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.listContainer]} pointerEvents="none" />
      <FlatList
        onScroll={handleScroll}
        data={items}
        style={styles.flatListElement}
        overScrollMode="never"
        contentContainerStyle={{
          paddingVertical: 82,
        }}
        hitSlop={hitSlop}
        renderItem={({ item }) => (
          <View
            style={{
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
            onStartShouldSetResponder={(): boolean => true}
          >
            <Text style={[font.heading[4], { color: theme.normal.black }]}>
              {item}
            </Text>
          </View>
        )}
        removeClippedSubviews
        decelerationRate="normal"
        snapToInterval={40}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 204,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  listContainer: {
    zIndex: 1,
    height: 40,
    position: "absolute",
  },
  flatListElement: {
    width: "100%",
    height: "100%",
  },
});
