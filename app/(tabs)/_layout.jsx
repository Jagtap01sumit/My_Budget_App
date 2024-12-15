import { Button, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useState } from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../utils/theme";
import ToggleSwitch from "toggle-switch-react-native";

export default function TabLayout() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isOn, setIsOn] = useState(theme.mode === "dark");
  const activeColors = colors[theme.mode];
  const [activeTab, setActiveTab] = useState("index");

  const toggleTheme = () => {
    setTheme((prevTheme) => ({
      mode: prevTheme.mode === "dark" ? "light" : "dark",
    }));
    setIsOn(!isOn);
  };

  const CustomHeader = ({ title }) => (
    <View style={[styles.header, {}]}>
      <View style={styles.headerContent}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={[styles.headerTitle, { color: activeColors.text }]}>
          {title}
        </Text>
      </View>
      {activeTab === "index" && (
        <ToggleSwitch
          isOn={isOn}
          offColor="#D1D1D6"
          onColor="gray"
          size="medium"
          onToggle={toggleTheme}
          animationSpeed={300}
          style={{ marginRight: 10 }}
        />
      )}
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColors.tabColor,
        tabBarInactiveTintColor: activeColors.inactiveColor,
      }}
      onTabPress={({ name }) => {
        setActiveTab(name);
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarStyle: styles.tabstyle,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              size={28}
              name="home"
              color={
                focused ? activeColors.tabColor : activeColors.inactiveColor
              }
            />
          ),
          tabBarLabel: () => null,
          header: () => <CustomHeader title="Plan My Budget" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarStyle: styles.tabstyle,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={
                focused ? activeColors.tabColor : activeColors.inactiveColor
              }
            />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarStyle: styles.tabstyle,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="history"
              size={24}
              color={
                focused ? activeColors.tabColor : activeColors.inactiveColor
              }
            />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabstyle: {
    position: "absolute",
    bottom: 15,
    left: 20,
    right: 20,
    elevation: 90,
    borderRadius: 20,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    overflow: "hidden",
    paddingBottom: 5,
    borderColor: "white",
    borderWidth: 2,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    marginHorizontal: 15,
    marginTop: 20,
    position: "absolute",
    left: 0,
    right: 0,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
