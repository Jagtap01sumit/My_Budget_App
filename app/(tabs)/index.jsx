import { Button, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import service from "../../utils/services";
import { client } from "../../utils/KindeConfig";
import { supabase } from "../../utils/supabaseConfig";
import Header from "../../components/Header";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../utils/theme";

export default function Home() {
  const { theme, setTheme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const router = useRouter();
  useEffect(() => {
    checkUserAuth();
  }, []);
  const checkUserAuth = async () => {
    const result = await service.getData("login");
    console.log(result);
    if (result !== "true") {
      router.push("/login");
    }
  };

  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      await service.storeData("login", "false");
      router.replace("/login");
    }
  };
  const handleCategoryList = async () => {
    const user = await client.getUserDetails();

    const { data, error } = await supabase
      .from("category")
      .select("*")
      .eq("created_by", user.email);

    console.log("data", data);
    console.log(error, "if error");
  };

  return (
    <View
      style={{
        marginTop: 20,
        padding: 20,
        backgroundColor: activeColors.tertiary,
      }}
    >
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({});
