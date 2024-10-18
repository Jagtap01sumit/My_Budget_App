import {
  Button,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import service from "../../utils/services";
import { client } from "../../utils/KindeConfig";
import { supabase } from "../../utils/supabaseConfig";
import Header from "../../components/Header";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../utils/theme";
import CircularChar from "../../components/CircularChar";
import { Ionicons } from "@expo/vector-icons";
import CategoryList from "../../components/CategoryList";

export default function Home() {
  const { theme, setTheme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const router = useRouter();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const img = require("../../assets/images/loading.png");
  useEffect(() => {
    checkUserAuth();
    getCategoryList();
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

  const getCategoryList = async () => {
    setLoading(true);
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from("category")
      .select("*,categoryitems(*)")
      .eq("created_by", user.email);

    if (error) {
      console.error("Error fetching category list:", error);
    } else {
      setCategoryList(data);
      setLoading(false);
    }

    // console.log("data", data);
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Image source={img} style={{ height: 100, width: 100 }}></Image>
        </View>
      )}
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => getCategoryList()}
            refreshing={loading}
          />
        }
      >
        <View
          style={{
            padding: 20,
            paddingTop: 40,
            backgroundColor: activeColors.primary,
            height: 200,
          }}
        >
          <Header />
        </View>
        <View style={{ padding: 20, marginTop: -115 }}>
          <CircularChar />
          <CategoryList categoryList={categoryList} />
        </View>
      </ScrollView>
      <View style={styles.adBtnContainer}>
        <Link href={"/add-new-category"}>
          <Ionicons name="add-circle" size={74} color={activeColors.accent} />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adBtnContainer: { position: "absolute", bottom: 16, right: 16 },
});
