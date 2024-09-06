import {
  AlarmIcon,
  DisplayModeIcon,
  PickLogo,
  ViewSettingIcon,
} from "@/assets/icons";
import useThemeStore from "@/utils/stores/usethemeProp";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Button,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import BottomSheet from "./changeBottomSheet";
import useViewSettingStore from "@/utils/stores/useViewSetting";

export default function ({ router }) {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const { theme, toggleTheme } = useThemeStore((state) => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
  }));
  const { view, Change } = useViewSettingStore((state) => ({
    view: state.view,
    Change: state.Change,
  }));

  return (
    <View style={[{ backgroundColor: theme.BG }, style.container]}>
      <PickLogo face={theme.normal.black} body={theme.Main[500]} />
      <View style={style.IconWrap}>
        {router === "홈" && (
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <ViewSettingIcon Fill={theme.normal.black} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={toggleTheme}>
          <DisplayModeIcon Fill={theme.normal.black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("공지" as never)}>
          <AlarmIcon Fill={theme.normal.black} />
        </TouchableOpacity>
      </View>
      {modalVisible && (
        <BottomSheet
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={`지금은 ${
            view === "timetable" ? "시간표" : "급식으로"
          } 설정되어 있어요`}
          content={`메인에서 ${view === "timetable" ? "급식" : "시간표"} 보기`}
          highlight=""
          buttonClick={Change}
          buttonMessage={`${
            view === "timetable" ? "급식으로" : "시간표로"
          } 설정하기`}
        />
      )}
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
