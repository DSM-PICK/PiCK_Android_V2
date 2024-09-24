import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HiddenView } from "../../../../components/layout";
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
    <View>
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={[font.subTitle[1], { color: theme.Main[700] }]}>
            {timeSet[time]}
          </Text>
        </View>
        <View style={styles.menuContainer}>
          <HiddenView data={_menu?.menu?.length !== 0}>
            {_menu.menu.map((item: string, index: number) => (
              <Text
                style={[font.body[1], { color: theme.normal.black }]}
                key={index}
              >
                {item}
              </Text>
            ))}
          </HiddenView>
          <HiddenView data={_menu?.menu?.length === 0}>
            <Text style={{ color: theme.normal.black }}>급식이 없습니다</Text>
          </HiddenView>
        </View>
        {_menu?.menu?.length !== 0 && (
          <Text
            style={[
              font.caption[2],
              styles.cal,
              { backgroundColor: theme.Main[500], color: theme.normal.white },
            ]}
          > 
            {cal}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  dateContainer: {
    flexDirection: "row",
    width: "20%",
  },
  menuContainer: {
    width: "30%",
  },
  cal: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
