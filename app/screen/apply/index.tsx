import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ApplicationBox } from "./box";
import useThemeStore from "@/utils/stores/usethemeProp";
import Header from "@/components/common/header";
import { font } from "@/utils";
import {
  AllIcon,
  ApplicationIcon,
  EarlyReturnIcon,
  MoveIcon,
} from "@/assets/icons";
import Meal from "@/assets/icons/meal";

export const Apply = () => {
  const { theme } = useThemeStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const toggleExplain = (id: string) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  return (
    <View>
      <View
        style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1 }}
      >
        <Header />
      </View>
      <ScrollView
        style={[
          styles.container,
          styles.boxContainer,
          { backgroundColor: theme.BG },
        ]}
      >
        <Text style={[{ color: theme.normal.black }, font.heading[4]]}>
          신청
        </Text>
        <View style={styles.boxContainer}>
          <ApplicationBox
            id="1"
            selected={selectedId === "1"}
            onPress={() => toggleExplain("1")}
            Icon={<Meal Fill={theme.Gray[800]} />}
            title="주말 급식 신청"
            explane={`지금은 주말급식 신청 기간입니다.
주말 급식 신청은 매달 한 번 한정된 기간에 합니다.`}
            to="주말급식"
          />
          <ApplicationBox
            id="2"
            selected={selectedId === "2"}
            onPress={() => toggleExplain("2")}
            Icon={<MoveIcon Fill={theme.Gray[800]} />}
            title="교실 이동 신청"
            explane={`선생님께서 수락하시기 전엔 이동할 수 없습니다.
수락 후 이동하시기 바랍니다.`}
            to="교실이동"
          />
          <ApplicationBox
            id="3"
            selected={selectedId === "3"}
            onPress={() => toggleExplain("3")}
            Icon={<ApplicationIcon Fill={theme.Gray[800]} />}
            title="외출 신청"
            explane="선생님께 미리 수락을 받은 뒤 신청합니다."
            to="외출"
          />
          <ApplicationBox
            id="4"
            selected={selectedId === "4"}
            onPress={() => toggleExplain("4")}
            Icon={<EarlyReturnIcon Fill={theme.Gray[800]} />}
            title="조기 귀가 신청"
            explane="선생님께 미리 수락을 받은 뒤 신청합니다."
            to="조기귀가"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: "column",
    paddingTop: 78,
    height: "100%",
  },
  boxContainer: {
    flexDirection: "column",
    gap: 20,
    marginTop: 20,
  },
});
