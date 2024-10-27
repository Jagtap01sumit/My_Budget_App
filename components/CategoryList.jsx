import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../utils/theme";
import { useRouter } from "expo-router";

export default function CategoryList({ categoryList }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const router = useRouter();
  const onCategoryClick = (category) => {
    router.push({
      pathname: "/category-details",
      params: {
        categoryId: category.id,
      },
    });
  };

  const calculateTotalCost = (categoryitems) => {
    let totalCost = 0;
    categoryitems?.forEach((item) => {
      totalCost = totalCost + item.cost;
    });
    return totalCost;
  };
  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{ fontFamily: "outfit-bold", fontSize: 25, marginBottom: 10 }}
      >
        Latest Budget
      </Text>
      <View>
        {categoryList?.map((category, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onCategoryClick(category);
              }}
              key={index}
              style={[
                styles.container,
                {
                  backgroundColor: activeColors.secondary,
                },
              ]}
            >
              <View style={styles.iconContainer}>
                <Text
                  style={[
                    styles.iconText,
                    {
                      backgroundColor: category.color,
                      color: activeColors.text,
                    },
                  ]}
                >
                  {category.icons}
                </Text>
              </View>
              <View style={styles.subContainer}>
                <View>
                  <Text
                    style={[styles.categoryText, { color: activeColors.text }]}
                  >
                    {category.name}
                  </Text>
                  <Text
                    style={[styles.itemCount, { color: activeColors.text }]}
                  >
                    {category.categoryitems?.length} ITems
                  </Text>
                </View>
                <Text
                  style={[styles.totalAmountText, { color: activeColors.text }]}
                >
                  $ {calculateTotalCost(category.categoryitems )}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "baseline",
  },
  iconText: {
    fontSize: 35,
    borderRadius: 15,
    padding: 16,
  },
  categoryText: { fontFamily: "outfit-bold", fontSize: 20 },
  itemCount: { fontFamily: "outfit-normal" },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
  },
  totalAmountText: {
    fontSize: 17,
    fontFamily: "outfit-bold",
  },
});
