import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HiddenView } from "@/components/layout";
import Move from "./move";
import Home from "./home";
import Out from "./out";
import Box from "@/components/layout/box";
import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";

interface PropType {
  type: string;
  data: any;
}

const Types = {
  EARLYRETURN: ({ user_name, start }) => Home({ name: user_name, data: start }),
  CLASSROOM: ({ classroom, start, end }) =>
    Move({ locate: classroom, data: [start, end] }),
  APPLICATION: ({ user_name, end, start }) =>
    Out({ name: user_name, data: [start, end] }),
};

export default function Pass({ type, data }: PropType) {
  const { theme } = useThemeStore();

  console.log(data?.type);

  return (
    <HiddenView data={!!data}>
      <Box>
        {data?.userId || data?.userName ? (
          <View style={styles.container}>
            {data?.type === "EARLY_RETURN" && (
              <Home name={data?.userName} data={data?.start} />
            )}
            {data?.type === "APPLICATION" && (
              <Out name={data?.userName} data={[data?.start, data?.end]} />
            )}
            {data?.type === "CLASSROOM" && (
              <Move locate={data?.classroom} data={[data?.start, data?.end]} />
            )}
          </View>
        ) : (
          <Text
            style={[
              font.subTitle[2],
              {
                color: theme.Main[500],
                textAlign: "center",
              },
            ]}
          >
            수락 대기중입니다
          </Text>
        )}
      </Box>
    </HiddenView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
