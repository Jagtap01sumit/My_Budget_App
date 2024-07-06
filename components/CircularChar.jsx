import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import PieChart from "react-native-pie-chart";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../utils/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CircularChar() {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([activeColors.secondary]);
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
        Total Estimate : <Text style={{ fontFamily: "outfit-bold" }}>0$</Text>
      </Text>
      <View style={styles.subContainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={activeColors.tertiary}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="checkbox-blank-circle"
            size={24}
            color={activeColors.secondary}
          />
          {/* <Text style={{ color: activeColors.tertiary }}>{theme.mode}</Text> */}
          <Text style={{ color: activeColors.secondary }}>NA</Text>
        </View>
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
});
