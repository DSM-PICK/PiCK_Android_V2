import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "@/components/common/header";
import useThemeStore from "@/utils/stores/usethemeProp";
import Tabbar from "./components/tabbar";
import TernaryView from "@/components/layout/TernaryView";
import TimeTable from "./components/timeTable";
import Schedules from "./components/schedules";

export const Schedule = () => {
  const { theme } = useThemeStore();
  const [selectedTab, setSelectedTab] = useState<string>("시간표");

  return (
    <View style={[styles.container, { backgroundColor: theme.BG }]}>
      <Header />
      <View
        style={{
          height: "100%",
          marginTop: 96,
          paddingHorizontal: 24,
          gap: 32,
        }}
      >
        <Tabbar selectedTab={selectedTab} onTabPress={setSelectedTab} />
        <TernaryView
          data={selectedTab === "시간표"}
          onTrue={<TimeTable />}
          onFalse={<Schedules />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 50,
  },
});
