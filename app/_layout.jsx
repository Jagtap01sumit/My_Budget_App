import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { ThemeContext } from "../context/ThemeContext";
import { useFonts } from "expo-font";
export default function HomeLayout() {
  const [theme, setTheme] = useState({ mode: "dark" });
  const [fontsLoaded, fontError] = useFonts({
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-new-category"
          options={{
            presentation: "modal",
            // style:{{backgroundColor:"transparent"}},

            headerShown: true,
            headerTitle: "Add New Category",
          }}
        />
        <Stack.Screen
          name="add-new-category-items"
          options={{
            presentation: "modal",
            headerShown: true,
            headerTitle: "Add New Item",
          }}
        />
      </Stack>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({});
