import React from "react";
import { Animated, StyleSheet, StatusBar, View, Text } from "react-native";
import { useEffect, useRef } from "react";
import { debounce, font, useToast } from "@/utils";
import * as _ from "@/assets/toastIcons";
import { HiddenView } from "@/components/layout";
import useThemeStore from "@/utils/stores/usethemeProp";

export default function ToastManager() {
  const { type, message, show, stop } = useToast();
  const pos = useRef(new Animated.Value(100)).current;
  const { theme } = useThemeStore();

  const Component = _[type] || "";

  const showT = () => {
    Animated.timing(pos, {
      toValue: -80,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (type !== "waiting") {
        debounce(stop, 1000);
      }
    });
  };

  const hideT = () => {
    Animated.timing(pos, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    show ? showT() : hideT();
  }, [show, type]);

  console.log(show);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: pos,
            },
          ],
          backgroundColor: theme.Gray[50],
        },
      ]}
    >
      <HiddenView data={type !== ""}>
        <Component />
      </HiddenView>

      <Text style={[font.body[1], { color: theme.normal.black }]}>
        {message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    padding: 10,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: "absolute",
    bottom: 1,
    zIndex: 100,
    alignSelf: "center",
    elevation: 3,
  },
});
