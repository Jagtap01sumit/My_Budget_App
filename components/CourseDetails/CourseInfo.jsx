import { Alert, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils/theme";
import { ThemeContext } from "../../context/ThemeContext";
import { TouchableOpacity } from "react-native";
import { supabase } from "../../utils/supabaseConfig";
import { router, useRouter } from "expo-router";

export default function CourseInfo({ categoryData }) {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const router = useRouter();
  const [totalCost, setTotalCost] = useState(0);
  const [percTotal, setPercTotal] = useState(0);

  useEffect(() => {
    if (categoryData) {
      calculateTotalPerc();
    }
  }, [categoryData]);

  const calculateTotalPerc = () => {
    let total = 0;

    categoryData?.categoryitems?.forEach((item) => {
      total += item.cost || 0;
    });

    setTotalCost(total);

    if (categoryData.assigned_budget > 0) {
      let perc = (total / categoryData.assigned_budget) * 100;

      if (perc > 100) {
        perc = 100;
      }
      setPercTotal(perc);
    } else {
      setPercTotal(0);
    }
  };
  const onDeleteCategory = () => {
    Alert.alert("Are you Sure", "Do you really want to delete this category", [
      {
        text: "Cancle",
        styles: "cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase
            .from("categoryitems")
            .delete()
            .eq("category_id", categoryData);

          await supabase.from("category").delete().eq("id", categoryData.id);
          ToastAndroid.show("Category Deleted!", ToastAndroid.SHORT);
          router.replace("/(tabs)");
        },
      },
    ]);
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text
            style={[styles.textIcon, { backgroundColor: categoryData.color }]}
          >
            {categoryData.icons}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.categoryName, { color: activeColors.text }]}>
            {categoryData?.name}
          </Text>
          <Text style={[styles.categoryItemText, { color: activeColors.text }]}>
            {categoryData?.categoryitems?.length} item
          </Text>
        </View>
        <TouchableOpacity onPress={() => onDeleteCategory()}>
          <Ionicons name="trash-bin-sharp" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={[styles.amountContainer, { color: activeColors.text }]}>
        <Text style={{ color: activeColors.text }}>$ {totalCost}</Text>
        <Text
          style={[
            { color: activeColors.text },
            { fontFamily: "outfit-normal" },
          ]}
        >
          Total Budget : {categoryData.assigned_budget}
        </Text>
      </View>
      <View style={styles.progressBarMainContainer}>
        <View
          style={[
            styles.progressBarSubContainer,
            { backgroundColor: activeColors.primary, width: `${percTotal}%` }, // Set width as a percentage
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "baseline",
  },
  textIcon: {
    fontSize: 20,
    padding: 20,
    borderRadius: 15,
  },
  categoryName: { fontFamily: "outfit-bold", fontSize: 24 },
  categoryItemText: {
    fontFamily: "outfit-normal",
    fontSize: 17,
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  progressBarMainContainer: {
    width: "100%",
    borderRadius: 99,
    backgroundColor: "gray",
    height: 15,
    marginTop: 7,
  },
  progressBarSubContainer: {
    borderRadius: 99,
    height: 15,
  },
});
