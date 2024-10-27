import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import PieChart from "react-native-pie-chart";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../utils/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../utils/Colors";

export default function CircularChar({ categoryList }) {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([activeColors.secondary]);
  const [totalCostEstimate, setToalCostEstimate] = useState();
  useEffect(() => {
    if (categoryList && categoryList.length > 0) {
      updateCircularChart();
    }
  }, [categoryList]);

  const updateCircularChart = () => {
    let totalEstimates = 0;
    const newValues = [];
    const newSliceColors = [];
    let otherCost = 0;
    categoryList.forEach((category, index) => {
      if (index < 4) {
        let itemTotalCost = 0;
        category.categoryitems?.forEach((item) => {
          itemTotalCost += item.cost;
          totalEstimates += item.cost;
        });
        newSliceColors.push(colors.COLOR_LIST[index]);
        newValues.push(itemTotalCost);
      } else {
        let itemTotalCost = 0;
        category.categoryitems?.forEach((item) => {
          otherCost += item.cost;
          totalEstimates += item.cost;
        });
      }
      setToalCostEstimate(totalEstimates);
      newSliceColors.push(colors.COLOR_LIST[5]);
      newValues.push(otherCost);
    });

    // If the sum of newValues is zero, use a fallback value to avoid the error.
    if (newValues.reduce((sum, value) => sum + value, 0) === 0) {
      setValues([1]);
      setSliceColor([activeColors.secondary]);
    } else {
      setValues(newValues);
      setSliceColor(newSliceColors);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.tertiary }]}
    >
      <Text
        style={{
          fontSize: 20,
          color: activeColors.text,
          fontFamily: "outfit-regular",
        }}
      >
        Total Estimate :{totalCostEstimate}
        <Text style={{ fontFamily: "outfit-bold" }}></Text>
      </Text>
      <View style={styles.subContainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={activeColors.tertiary}
        />
        {categoryList.length === 0 ? (
          <View style={styles.chartNameContainer}>
            <MaterialCommunityIcons
              name="checkbox-blank-circle"
              size={24}
              color={activeColors.secondary}
            />
            <Text style={{ color: activeColors.secondary }}>NA</Text>
          </View>
        ) : (
          <View>
            {categoryList.map(
              (category, index) =>
                index <= 4 && (
                  <View key={index} style={styles.chartNameContainer}>
                    <MaterialCommunityIcons
                      name="checkbox-blank-circle"
                      size={24}
                      color={colors.COLOR_LIST[index]}
                    />
                    <Text style={{ color: activeColors.text }}>
                      {index < 4 ? category.name : "other"}
                    </Text>
                  </View>
                )
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 1,
  },
  subContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    gap: 40,
  },
  chartNameContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
});
