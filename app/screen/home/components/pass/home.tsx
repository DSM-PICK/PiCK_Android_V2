import React, { useState } from "react";
import { Modal, Text, View } from "react-native";
import Pass from "./pass";
import useThemeStore from "@/utils/stores/usethemeProp";
import { font } from "@/utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "@/components/common";

interface PropType {
  name: string;
  data: string;
}

export default function Home({ name, data }: PropType) {
  const { theme } = useThemeStore();
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <View>
        <Text style={[font.label[1], { color: theme.normal.black }]}>
          {name}님의 조기귀가 시간은
        </Text>
        <Text style={[font.label[1], { color: theme.normal.black }]}>
          <Text style={{ color: theme.Main[500] }}>{data}</Text>
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
            조기귀가증 보기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
          }}
        >
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
              <Pass type="earlyReturn" />
              <Button size="login" onPress={() => setVisible(false)}>
                닫기
              </Button>
            </TouchableOpacity>
          </Modal>
        </TouchableOpacity>
      </View>
    </>
  );
}
