import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { ThemeContext } from "../context/ThemeContext";

export default function HomeLayout() {
  const [theme, setTheme] = useState({ mode: "dark" });
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({});
