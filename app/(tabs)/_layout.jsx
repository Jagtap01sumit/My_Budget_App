import { Button, StyleSheet, Text, View } from "react-native";
import React, { act, useContext, useState } from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../utils/theme";
import ToggleSwitch from "toggle-switch-react-native";
export default function TabLayout() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isOn, setIsOn] = useState(theme.mode === "light");
  const activeColors = colors[theme.mode];
  const toggleTheme = () => {
    setTheme((prevTheme) => ({
      mode: prevTheme.mode === "dark" ? "light" : "dark",
    }));
    setIsOn(!isOn);
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColors.tabColor,
        // headerShown: false,
        headerRight: () => (
          //
          <ToggleSwitch
            isOn={isOn}
            offColor="#D1D1D6"
            onColor="#3A3A3C"
            size="medium"
            onToggle={toggleTheme}
            style={{ marginRight: 10 }}
            animationSpeed={300}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="history" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
