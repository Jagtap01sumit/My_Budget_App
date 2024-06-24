import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colors } from "../utils/theme";
import { ThemeContext } from "../context/ThemeContext";
import { client } from "../utils/KindeConfig";
import { Ionicons } from "@expo/vector-icons";
export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [user, setUser] = useState();

  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const user = await client.getUserDetails();

    setUser(user);
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        // justifyContent: "space-between",
      }}
    >
      <Image
        source={{ uri: user?.picture }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 99,
          borderWidth: 0.5,
          borderColor: activeColors.primary,
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "85%",
        }}
      >
        <View>
          <Text style={{ color: activeColors.primary, fontSize: 16 }}>
            Welcome
          </Text>
          <Text
            style={{
              color: activeColors.primary,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {user?.given_name}
          </Text>
        </View>
        <Ionicons name="notifications" size={24} color={activeColors.tint} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
