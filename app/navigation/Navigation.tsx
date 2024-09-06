import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as _ from "@/screen";
import Home from "@/assets/icons/home";
import useThemeStore from "@/utils/stores/usethemeProp";
import {
  AllIcon,
  ApplicationIcon,
  MelasIcon,
  MoveIcon,
  ScheduleIcon,
} from "@/assets/icons";
import { getToken } from "@/utils";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ApplyStack() {
  return (
    <Stack.Navigator
      initialRouteName="신청"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="신청" component={_.Apply} />
      <Stack.Screen name="주말급식" component={_.WeekendMealApply} />
      <Stack.Screen name="교실이동" component={_.Move} />
      <Stack.Screen name="외출" component={_.Out} />
      <Stack.Screen name="조기귀가" component={_.Out} />
    </Stack.Navigator>
  );
}

function AllPageStack() {
  return (
    <Stack.Navigator
      initialRouteName="전체"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="전체" component={_.AllPage} />
      <Stack.Screen name="모바일학생증" component={_.Apply} />
      <Stack.Screen name="자습감독" component={_.Apply} />
      <Stack.Screen name="공지사항" component={_.Apply} />
      <Stack.Screen name="버그제보" component={_.Apply} />
      <Stack.Screen name="커스텀" component={_.CustomPage} />
      <Stack.Screen name="알림설정" component={_.AlarmCustom} />
      <Stack.Screen name="마이페이지" component={_.Apply} />
      <Stack.Screen name="로그아웃" component={_.Apply} />
    </Stack.Navigator>
  );
}

function HomeNav() {
  const auth = getToken();
  const { theme } = useThemeStore();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.Main[500],
        tabBarActiveBackgroundColor: theme.BG,
        tabBarInactiveBackgroundColor: theme.BG,
      }}
    >
      <Tab.Screen
        name="홈"
        component={_.Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Home Fill={theme.Main[500]} />
            ) : (
              <Home Fill={theme.Gray[500]} />
            ),
        }}
      />
      <Tab.Screen
        name="급식"
        component={_.Login}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MelasIcon Fill={theme.Main[500]} />
            ) : (
              <MelasIcon Fill={theme.Gray[500]} />
            ),
        }}
      />
      <Tab.Screen
        name="신청"
        component={ApplyStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ApplicationIcon Fill={theme.Main[500]} />
            ) : (
              <ApplicationIcon Fill={theme.Gray[500]} />
            ),
          tabBarStyle: {
            display: route.name === "신청" ? "flex" : "none",
          },
        })}
      />
      <Tab.Screen
        name="일정"
        component={_.Schedule}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ScheduleIcon Fill={theme.Main[500]} />
            ) : (
              <ScheduleIcon Fill={theme.Gray[500]} />
            ),
        }}
      />
      <Tab.Screen
        name="전체"
        component={AllPageStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AllIcon Fill={theme.Main[500]} />
            ) : (
              <AllIcon Fill={theme.Gray[500]} />
            ),
          tabBarStyle: {
            display: route.name === "전체" ? "flex" : "none",
          },
        })}
      />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainBottom"
        component={HomeNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
