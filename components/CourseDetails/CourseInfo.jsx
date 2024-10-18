import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils/theme";
import { ThemeContext } from "../../context/ThemeContext";
export default function CourseInfo({ categoryData }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
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
          <Text style={styles.categoryName}>{categoryData?.name}</Text>
          <Text style={styles.categoryItemText}>
            {categoryData?.categoryitems?.length} item
          </Text>
        </View>
        <Ionicons name="trash-bin-sharp" size={24} color="red" />
      </View>
      {/* progreee bar  */}
      <View style={styles.amountContainer}>
        <Text>$500</Text>
        <Text style={{ fontFamily: "outfit-normal" }}>
          Total Budget : {categoryData.assigned_budget}
        </Text>
      </View>
      <View style={styles.progressBarMainContainer}>
        <View
          style={[
            styles.progressBarSubContainer,
            { backgroundColor: activeColors.primary },
          ]}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: "flex",
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
    display: "flex",
    justifyContent: "space-between",
    marginTop: 15,
    flexDirection: "row",
  },
  progressBarMainContainer: {
    width: "100%",
    borderRadius: 99,
    backgroundColor: "gray",
    height: 15,
    marginTop: 7,
  },
  progressBarSubContainer: {
    width: "40%",

    borderRadius: 99,
    height: 15,
  },
});
