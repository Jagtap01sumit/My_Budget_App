import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../utils/supabaseConfig";
import { Ionicons } from "@expo/vector-icons";
import CourseInfo from "../components/CourseDetails/CourseInfo";
import CourseItermList from "../components/CourseDetails/CourseItermList";
export default function categoryDetails() {
  const { categoryId } = useLocalSearchParams();
  const [categoryData, setCategoryData] = useState([]);

  const router = useRouter();
  useEffect(() => {
    console.log(categoryId);
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
      console.log(categoryData);
    }
  };
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={34} color="black" />
      </TouchableOpacity>
      <CourseInfo categoryData={categoryData} />
      <CourseItermList categoryData={categoryData} />
    </View>
  );
}

const styles = StyleSheet.create({});
