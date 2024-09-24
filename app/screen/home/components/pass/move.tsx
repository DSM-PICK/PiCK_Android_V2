import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { path, queryKeys } from "@/constants";
import { deleet, font } from "@/utils";
import { Button } from "@/components/common";
import useThemeStore from "@/utils/stores/usethemeProp";

interface PropType {
  locate: string;
  data: [string, string];
}

export default function Move({ locate, data }: PropType) {
  const queryClient = useQueryClient();
  const { theme } = useThemeStore();

  const { mutate: returnFn } = useMutation({
    mutationFn: () => deleet(`${path.classRoom}/return`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.anyApply });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  console.log(data + "d");

  return (
    <>
      <View>
        <Text style={[font.label[1], { color: theme.normal.black }]}>
          {locate} 이동 시간은
        </Text>
        <Text style={[font.label[1], { color: theme.normal.black }]}>
          <Text style={{ color: theme.Main[500] }}>
            {data[0]}교시 ~ {data[1]}교시
          </Text>
          입니다
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: theme.Main[400] }]}
        onPress={() => returnFn()}
      >
        <Text style={[font.button[2], { color: theme.normal.white }]}>
          돌아가기
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 120,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
