import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as _ from "@/screen";
import { HomeIcon } from "@/assets/icons";
import useThemeStore from "@/utils/stores/usethemeProp";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// function HomeStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="홈" component={_.Home} />
//       <Stack.Screen name="상세공지" component={_.OnBoard} />
//       <Stack.Screen name="온보딩메인" component={_.OnBoard} />
//       <Stack.Screen name="로그인" component={_.Login} />
//     </Stack.Navigator>
//   );
// }

export default function BottomTabNavigationApp() {
  const { theme } = useThemeStore();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.BG,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="급식" component={_.Login} />
      <Tab.Screen name="신청" component={_.Apply} />
      <Tab.Screen name="일정" component={_.TodaySelfStudyList} />
      <Tab.Screen
        name="전체"
        component={_.Home}
        options={{ tabBarIcon: () => <HomeIcon Fill={theme.Main[900]} /> }}
      />
    </Tab.Navigator>
  );
}
