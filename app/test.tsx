import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import useThemeStore from "./utils/stores/usethemeProp";

const ThemedComponent = () => {
  const { theme, toggleTheme } = useThemeStore((state) => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
  }));

  const containerStyle = {
    ...styles.container,
    backgroundColor: theme?.BG || "#000000",
  };

  const textStyle = {
    ...styles.text,
    color: theme?.normal?.white || "#ffffff",
  };

  return (
    <>
      <View style={containerStyle}>
        <Text style={textStyle}>텍스트 테스트</Text>
        <Button title="Toggle Theme" onPress={toggleTheme} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ThemedComponent;
