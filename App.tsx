import React, { useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import useNotification from "@/hooks/useNotification";
import ToastManager from "@/components/common/toast";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getToken } from "@/utils";
import MainNavigator from "@/navigation/Navigation";

const loadFonts = () => {
  return Font.loadAsync({
    WantedSans: require("assets/fonts/WantedSans-Regular.ttf"),
  });
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true,
      retryDelay: 300,
      staleTime: 10000,
    },
  },
});

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts()
      .then(() => setFontsLoaded(true))
      .catch((error) => console.error(error));
  }, []);

  // useNotification을 항상 호출
  useNotification();

  if (!fontsLoaded) {
    return <></>; // 폰트가 로드되지 않은 경우 빈 화면 반환
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <ToastManager />
          <StatusBar style={"auto"} />
          <MainNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;
