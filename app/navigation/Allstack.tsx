import "react-native-gesture-handler";
import React, { useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as _ from "@/screen";

const Stack = createStackNavigator();

export const AllPageStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="전체"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="전체" component={_.AllPage} />
      <Stack.Screen name="모바일학생증" component={_.Apply} />
      <Stack.Screen name="자습감독" component={_.SelfStudyList} />
      <Stack.Screen name="공지사항" component={_.Notice} />
      {/* <Stack.Screen name="버그제보" component={_.Bug} /> */}
      <Stack.Screen name="커스텀" component={_.CustomPage} />
      <Stack.Screen name="알림설정" component={_.AlarmCustom} />
      <Stack.Screen name="마이페이지" component={_.My} />
      <Stack.Screen name="로그아웃" component={_.Apply} />
      <Stack.Screen name="상세공지" component={_.DetailNotice} />
    </Stack.Navigator>
  );
};
