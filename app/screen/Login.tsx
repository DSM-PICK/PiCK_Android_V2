import { Button, Input } from "@/components/common";
import { changeEventType } from "@/components/common/input";
import { path } from "@/constants/querykey";
import { font, setToken } from "@/utils";
import { get, loginInstance } from "@/utils/function/api";
import useThemeStore from "@/utils/stores/usethemeProp";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from "react-native";

export const Login = () => {
  const { theme } = useThemeStore();
  const [data, setData] = useState({
    account_id: "",
    password: "",
  });
  const disabled = !!!data.account_id || !!!data.password;
  const navigation = useNavigation();
  const [error, setError] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleChange = ({ text, name }: changeEventType) => {
    setData({ ...data, [name]: text });
  };

  const { mutate: loginFn } = useMutation({
    mutationFn: () => loginInstance.post(`${path.user}/login`, data),
    onError: (error) => {
      setError(true);
      console.log(error.message);
    },
    onSuccess: async (res: AxiosResponse) => {
      const { access_token } = res?.data;
      await setToken(access_token, Object.values(data), "");
      get("/user/simple").then(async (res) => {
        await setToken(access_token, Object.values(data), res.data.name);
      });
      navigation.navigate("홈" as never);
    },
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[style.container, { backgroundColor: theme.BG }]}>
        <ScrollView
          ref={scrollViewRef}
          style={style.textContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ gap: 12 }}>
            <Text style={[font.heading[2], { color: theme.normal.black }]}>
              <Text style={{ color: theme.Main[500] }}>PiCK</Text>에 로그인하기
            </Text>
            <Text style={[font.body[1], { color: theme.Gray[600] }]}>
              스퀘어 계정으로 로그인 해주세요.
            </Text>
          </View>
          <View style={style.inputContainer}>
            <Input
              onChange={handleChange}
              label="아이디"
              name="account_id"
              value={data.account_id}
              placeholder="아이디를 입력해주세요"
            />
            <View style={{ gap: 12 }}>
              <Input
                onChange={handleChange}
                label="비밀번호"
                name="password"
                value={data.password}
                placeholder="비밀번호를 입력해주세요"
                password
              />
              {error && (
                <Text style={[{ color: theme.Error, alignSelf: "flex-end" }]}>
                  다시 확인해주세요
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
        <View style={style.bottomButton}>
          <Button size="main" onPress={loginFn as any} disabled={disabled}>
            로그인
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 124,
    padding: 24,
  },
  bottomButton: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 30,
  },
  textContainer: {
    flex: 1,
    //justifyContent: "center",
    gap: 48,
  },
  inputContainer: {
    flex: 1,
    gap: 44,
    marginTop: 48,
  },
});
