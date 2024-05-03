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
      }}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({});
