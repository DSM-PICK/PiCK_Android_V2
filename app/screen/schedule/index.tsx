import React, { useState } from "react";
import { Text, View } from "react-native";
import Header from "@/components/common/header";
import useThemeStore from "@/utils/stores/usethemeProp";
import Tabbar from "./components/tabbar";
import TernaryView from "@/components/layout/TernaryView";
import TimeTables from "./components/timeTable";
import Schedules from "./components/schedules";

export const Schedule = () => {
  const { theme } = useThemeStore();
  const [selectedTab, setSelectedTab] = useState<string>("시간표");

  return (
    <View style={{ backgroundColor: theme.BG }}>
      <Header />
      <View style={{ height: "100%", marginTop: 72, paddingHorizontal: 24 }}>
        <Tabbar selectedTab={selectedTab} onTabPress={setSelectedTab} />
        <TernaryView
          data={selectedTab === "시간표"}
          onTrue={<TimeTables />}
          onFalse={<Schedules />}
        />
      </View>
    </View>
  );
};
