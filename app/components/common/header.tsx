import { DisplayModeIcon, PickLogo } from "@/assets/icons";
import useThemeStore from "@/utils/stores/usethemeProp";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
export default function () {
  const { theme, toggleTheme } = useThemeStore((state) => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
  }));

  return (
    <View style={[{ backgroundColor: theme.BG }, style.container]}>
      <PickLogo face={theme.normal.black} body={theme.Main[500]} />
      <View style={style.IconWrap}>
        <TouchableOpacity onPress={toggleTheme}>
          <DisplayModeIcon Fill={theme.normal.black} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate("알림" as never)}>
          <AlarmIcon Fill={theme.normal.black} />
        </TouchableOpacity> */}
        {/**나중에 알림 기능 추가하면서 사용할 예정 */}
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 8,
    position: "absolute",
    width: "100%",
    top: 0,
    paddingTop: 40,
  },
  IconWrap: {
    flexDirection: "row",
    gap: 12,
  },
});
