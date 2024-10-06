import Back from "@/assets/icons/backIcon";
//import Header from "@/components/common/header";
import { font, useToast } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CustomBox } from "./components/box";
//import Meal from "@/assets/icons/meal";
import { MainIcon, TimeIcon } from "@/assets/icons";
import useViewSettingStore from "@/utils/stores/useViewSetting";
import useTimePickerSetting from "@/utils/stores/useTimePickerSetting";

export const CustomPage = () => {
  const { theme } = useThemeStore();
  const navigation = useNavigation();
  const [mainPage, setMainPage] = useState<boolean>(false);
  const [picker, setPicker] = useState<boolean>(false);
  const toast = useToast();

  const { view, Change } = useViewSettingStore((state) => ({
    view: state.view,
    Change: state.changeView,
  }));

  const { Picker, ChangePicker } = useTimePickerSetting((state) => ({
    Picker: state.Picker,
    ChangePicker: state.ChangePicker,
  }));

  return (
    <View
      style={[
        {
          height: "100%",
          backgroundColor: theme.BG,
          paddingTop: 28,
          paddingHorizontal: 24,
        },
      ]}
    >
      <View style={styles.header}>
        <Pressable style={styles.Icon} onPress={() => navigation.goBack()}>
          <Back Fill={theme.normal.black} />
        </Pressable>
        <View style={styles.Icon} />
      </View>
      <View style={{ paddingTop: 24, gap: 20 }}>
        <View style={{ gap: 8 }}>
          <Text style={[font.heading[4], { color: theme.normal.black }]}>커스텀</Text>
          <Text style={[font.body[1], { color: theme.Gray[500] }]}>픽은 커스텀할 수 있어요!</Text>
        </View>
        <CustomBox
          buttonOnPress={() => {
            Change();
            setMainPage(false);
            toast.success("완료되었습니다!");
          }}
          selected={mainPage}
          onPress={() => setMainPage(!mainPage)}
          Icon={<MainIcon Fill={theme.Gray[800]} />}
          title="메인페이지 설정"
          explane={`메인페이지에서 급식 또는 시간표를 볼 수 있어요!
현재는 ${view === "meals" ? "급식으" : "시간표"}로 설정되어 있어요`}
          buttonMessage={`${view === "meals" ? "시간표" : "급식으"}로 보기`}
        />
        <CustomBox
          buttonMessage={`${Picker === "classTime" ? "시간으" : "교시"}로 설정하기`}
          buttonOnPress={() => {
            ChangePicker();
            setPicker(false);
            toast.success("완료되었습니다!");
          }}
          selected={picker}
          onPress={() => setPicker(!picker)}
          Icon={<TimeIcon Fill={theme.Gray[800]} />}
          title="신청 단위 설정"
          explane={`픽에서 신청할 때 시간 또는 교시로 설정할 수 있어요!
현재는 ${Picker === "classTime" ? "시간으" : "교시"}로 설정되어 있어요.`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gapContainer: {
    paddingHorizontal: 24,
  },
  endMealBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    gap: 5,
    flexDirection: "row",
  },
  applyContainer: {
    justifyContent: "space-between",
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  Icon: {
    width: 24,
    height: 24,
  },
});
