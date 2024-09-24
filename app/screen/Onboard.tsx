import { PickMan } from "@/assets/icons";
import { Button } from "@/components/common";
import useThemeStore from "@/utils/stores/usethemeProp";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const OnBoard = ({ navigation }: any) => {
  const { theme } = useThemeStore();
  const navigate = useNavigation();
  return (
    <View style={[style.container, { backgroundColor: theme.BG }]}>
      <View style={style.centered}>
        <PickMan
          face={theme.normal.white}
          body={theme.Main[500]}
          leg={theme.Main[700]}
        />
      </View>
      <View style={style.bottomButton}>
        <Button
          size="main"
          onPress={() => {
            navigation.navigate("로그인");
          }}
        >
          로그인하고 PiCK사용하기
        </Button>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButton: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 30,
  },
});
