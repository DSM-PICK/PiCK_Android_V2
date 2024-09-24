import "react-native-gesture-handler";
import React, { useCallback } from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as _ from "@/screen";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

type RootStackParamList = {
  신청: undefined;
  주말급식: undefined;
  교실이동: undefined;
  외출: undefined;
  조기귀가: undefined;
};

export const ApplyStack = () => {
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // useFocusEffect(
  //   useCallback(() => {
  //     navigation.popToTop();
  //   }, [navigation])
  // );
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
};
