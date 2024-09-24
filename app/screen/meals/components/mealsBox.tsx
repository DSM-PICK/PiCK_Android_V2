import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HiddenView } from "@/components/layout";
import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";

interface PropType {
  menu: [string, { menu: string[]; cal: string }];
}

const timeSet = { breakfast: "조식", lunch: "중식", dinner: "석식" };

export default function MenuItem({ menu }: PropType) {
  let [time, _menu] = menu;
  _menu.menu = _menu.menu.filter((item: string) => item !== "");
  const cal = _menu.cal;
  const { theme } = useThemeStore();

  return (
    <View style={[styles.container, { borderColor: theme.Main[50] }]}>
      <View style={styles.dateContainer}>
        <Text style={[font.subTitle[1], { color: theme.Main[700] }]}>
          {timeSet[time]}
        </Text>
        <HiddenView data={_menu?.menu?.length !== 0}>
          <Text
            style={[
              font.caption[2],
              styles.cal,
              { backgroundColor: theme.Main[500] },
            ]}
          >
            {cal}
          </Text>
        </HiddenView>
      </View>
      <View style={styles.menuContainer}>
        <HiddenView data={_menu?.menu?.length !== 0}>
          {_menu.menu.map((item: string, index: number) => (
            <Text
              style={[font.label[1], { color: theme.normal.black, width: 110 }]}
              key={index}
            >
              {item}
            </Text>
          ))}
        </HiddenView>
        <HiddenView data={_menu?.menu?.length === 0}>
          <Text style={[font.label[1], { color: theme.normal.black }]}>
            급식이 없습니다
          </Text>
        </HiddenView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderWidth: 2,
    borderRadius: 8,
  },
  dateContainer: {
    alignItems: "center",
    gap: 16,
  },
  menuContainer: {
    width: 110,
  },
  cal: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    color: "#fff",
  },
});
