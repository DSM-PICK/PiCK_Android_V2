import useThemeStore from "@/utils/stores/usethemeProp";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { ClassButton, ClassPicker, FloorButton } from "./components";
import { floorData } from "./floorData";
import Back from "@/assets/icons/backIcon";
import { font, post } from "@/utils";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@/components/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { path, queryKeys } from "@/constants";

const floors = Array.from(new Array(5).keys()).map((i) => i + 1);

export const Move = () => {
  const { theme } = useThemeStore();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({
    floor: 1,
    classroom_name: undefined,
  });
  const disabled = !selected.classroom_name;
  const queryClient = useQueryClient();

  const { mutate: moveMutate } = useMutation({
    mutationFn: (item: any) => post(`${path.classRoom}/move`, item),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.anyApply });
      await navigation.reset({ routes: [{ name: "홈" as never }] });
      //toast.success(`${className} 이동이 신청됬습니다`);
    },
    onError: ({ status }: any) =>
      // toast.error(
      //   status === 409 ? "이미 신청되었습니다" : "오류가 발생했습니다"
      // ),
      console.log(status),
  });

  const Renderor = ({ item }) => (
    <ClassButton
      width={width}
      selected={selected}
      setSelected={setSelected}
      item={item}
    />
  );

  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: theme.BG, height: "100%" }}>
      <View style={{ paddingTop: 44 }}>
        <View style={styles.header}>
          <Pressable style={styles.Icon} onPress={() => navigation.goBack()}>
            <Back Fill={theme.normal.black} />
          </Pressable>
          <Text style={[font.body[1], { color: theme.normal.black }]}>
            교실 이동 신청
          </Text>
          <View style={styles.Icon} />
        </View>
        <View style={styles.containerWrap}>
          <Text style={[font.heading[4], { color: theme.normal.black }]}>
            교실 이동
          </Text>
          <Text style={[font.body[2], { color: theme.Gray[600] }]}>
            자습 감독 선생님께서 수락 후 이동할 수 있습니다.
          </Text>
        </View>
        <View style={styles.floorButtonContainer}>
          {floors.map((item) => (
            <FloorButton
              key={item}
              selected={selected}
              setSelected={setSelected}
              item={item}
            />
          ))}
        </View>
        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <FlatList
            onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
            contentContainerStyle={styles.classButtonContainer}
            columnWrapperStyle={styles.classButtonContainer}
            data={floorData[selected.floor - 1]}
            keyExtractor={(_, index) => index.toString()}
            renderItem={Renderor}
            numColumns={3}
          />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          width: "100%",
          paddingHorizontal: 24,
          bottom: 28,
        }}
      >
        <Button
          size="main"
          onPress={() => setVisible(!visible)}
          disabled={disabled}
        >
          다음
        </Button>
        <ClassPicker
          visible={visible}
          setVisible={setVisible}
          onDone={(item: any) => moveMutate({ ...selected, ...item })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floorButtonContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 28,
  },
  classButtonContainer: {
    gap: 10,
  },
  Icon: {
    width: 24,
    height: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 24,
  },
  containerWrap: {
    marginTop: 32,
    paddingHorizontal: 24,
    gap: 12,
  },
});
