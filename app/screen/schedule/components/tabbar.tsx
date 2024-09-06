import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from "react-native";
import useThemeStore from "@/utils/stores/usethemeProp";
import { font } from "@/utils";

interface TabbarProps {
  selectedTab: string;
  onTabPress: (tab: string) => void;
}

export default function Tabbar({ selectedTab, onTabPress }: TabbarProps) {
  const { theme } = useThemeStore();
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const toValue = selectedTab === "시간표" ? 0 : 180;

    Animated.timing(translateX, {
      toValue,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [selectedTab]);

  const animatedStyle = {
    transform: [
      {
        translateX,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBackground}>
        <Animated.View
          style={[
            styles.slider,
            animatedStyle,
            { backgroundColor: theme.Main[50] },
          ]}
        />
      </View>
      <TouchableOpacity style={styles.tab} onPress={() => onTabPress("시간표")}>
        <Text style={[font.label[1], { color: theme.normal.black }]}>
          시간표
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => onTabPress("학사일정")}
      >
        <Text style={[font.label[1], { color: theme.normal.black }]}>
          학사일정
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    position: "relative",
  },
  tabBackground: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
  },
  slider: {
    width: "50%",
    height: "100%",
    borderRadius: 44,
  },
  tab: {
    width: "50%",
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 44,
    zIndex: 1,
  },
});
