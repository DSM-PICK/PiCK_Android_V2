import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as _ from "@/screen";
import Home from "@/assets/icons/home";
import useThemeStore from "@/utils/stores/usethemeProp";
import { AllIcon, ApplicationIcon, MelasIcon, ScheduleIcon } from "@/assets/icons";
import { getToken } from "@/utils";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { ApplyStack } from "./ApplyStack";
import { AllPageStack } from "./Allstack";

const Tab = createBottomTabNavigator();

const getTabBarVisibility = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "";
  if (
    routeName === "공지" ||
    routeName === "상세공지" ||
    routeName === "커스텀" ||
    routeName === "공지사항" ||
    routeName === "마이페이지" ||
    routeName === "외출" ||
    routeName === "조기귀가" ||
    routeName === "주말급식" ||
    routeName === "교실이동" ||
    routeName === "자습감독" ||
    routeName === "버그제보" ||
    routeName === "로그아웃"
  ) {
    return false;
  }
  return true;
};

interface IProp {
  token?: null | string;
}

export default function MainNavigator({ token }: IProp) {
  const { theme } = useThemeStore();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.Main[500],
        tabBarActiveBackgroundColor: theme.BG,
        tabBarInactiveBackgroundColor: theme.BG,
        tabBarStyle: {
          display: getTabBarVisibility(route) ? "flex" : "none",
        },
      })}
      initialRouteName={token ? "홈" : "온보딩"}
    >
      <Tab.Screen
        name="홈"
        component={_.Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <Home Fill={focused ? theme.Main[500] : theme.Gray[500]} />,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="급식"
        component={_.Melas}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MelasIcon Fill={focused ? theme.Main[500] : theme.Gray[500]} />
          ),
        }}
      />
      <Tab.Screen
        name="신청"
        component={ApplyStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <ApplicationIcon Fill={focused ? theme.Main[500] : theme.Gray[500]} />
          ),
        }}
      />
      <Tab.Screen
        name="일정"
        component={_.Schedule}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <ScheduleIcon Fill={focused ? theme.Main[500] : theme.Gray[500]} />
          ),
        }}
      />
      <Tab.Screen
        name="전체"
        component={AllPageStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AllIcon Fill={focused ? theme.Main[500] : theme.Gray[500]} />
          ),
        }}
      />
      <Tab.Screen
        name="로그인"
        component={_.Login}
        options={{
          tabBarButton: () => null,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="온보딩"
        component={_.OnBoard}
        options={{
          tabBarButton: () => null,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
}
