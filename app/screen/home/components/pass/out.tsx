import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "@/components/common";
import useThemeStore from "@/utils/stores/usethemeProp";
import { font } from "@/utils";
import Pass from "./pass";

interface PropType {
  name: string;
  data: any;
}

export default function Out({ name, data }: PropType) {
  const [visible, setVisible] = useState<boolean>(false);
  const { theme } = useThemeStore();
  const date = `${data[0]} ~ ${data[1]}`;

  console.log(name);

  return (
    <>
      <View>
        <Text style={[font.label[1], { color: theme.normal.black }]}>
          {name}님의 외출 시간은
        </Text>
        <Text style={[font.label[1], { color: theme.normal.black }]}>
          <Text style={{ color: theme.Main[500] }}>{date}</Text>
          입니다
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: theme.Main[700],
            borderRadius: 8,
            paddingHorizontal: 32,
            paddingVertical: 12,
          }}
          onPress={() => setVisible(true)}
        >
          <Text style={[font.button[2], { color: theme.normal.white }]}>
            외출증 보기
          </Text>
        </TouchableOpacity>
        <Modal transparent={true} visible={visible}>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(134, 124, 124, 0.5)",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
            onPress={() => setVisible(false)}
          >
            <Pass type="out" />
          </TouchableOpacity>
        </Modal>
      </View>
    </>
  );
}
