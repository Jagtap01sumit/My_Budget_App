import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../utils/supabaseConfig";

export default function categoryDetails() {
  const { categoryId } = useLocalSearchParams();
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
    }
    console.log("ca9t", data);
  };
  return (
    <View>
      <Text>categpry-details</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
