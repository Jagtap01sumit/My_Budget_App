import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { act, useContext, useEffect, useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../utils/supabaseConfig";
import { Ionicons } from "@expo/vector-icons";
import CourseInfo from "../components/CourseDetails/CourseInfo";
import CourseItermList from "../components/CourseDetails/CourseItermList";
import { colors } from "../utils/theme";
import { ThemeContext } from "../context/ThemeContext";
export default function categoryDetails() {
  const { categoryId } = useLocalSearchParams();
  const [categoryData, setCategoryData] = useState([]);
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  console.log(categoryId, "catid");
  const router = useRouter();
  useEffect(() => {
    console.log(categoryId, "id");
    getCategoryDetails();
  }, [categoryId]);

  const getCategoryDetails = async () => {
    const { data, error } = await supabase
      .from("category")
      .select("*,categoryitems(*)")
      .eq("id", categoryId);
    if (error) {
      console.log(error);
    } else {
      setCategoryData(data[0]);
      console.log(categoryData, "category_data data");
    }
  };
  return (
    <View
      style={{
        padding: 30,
        // marginTop: 20,
        flex: 1,
        backgroundColor: activeColors.secondary,
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={34} color="black" />
      </TouchableOpacity>
      <CourseInfo categoryData={categoryData} />
      <CourseItermList categoryData={categoryData} />

      <Link
        href={{
          pathname: "/add-new-category-items",
          params: {
            categoryId: categoryId,
          },
        }}
        style={styles.floatingBtn}
      >
        <Ionicons name="add-circle" size={60} color={activeColors.text} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingBtn: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
