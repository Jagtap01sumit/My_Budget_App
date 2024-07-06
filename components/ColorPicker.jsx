import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../utils/Colors";

export default function ColorPicker({ selectedColor, setSelectedColor }) {
  return (
    <View
      style={{ display: "flex", flexDirection: "row", gap: 20, marginTop: 10 }}
    >
      {Colors.COLOR_LIST.map((color, idx) => {
        return (
          <TouchableOpacity
            key={idx}
            style={[
              {
                height: 30,
                width: 30,
                backgroundColor: color,
                borderRadius: 99,
              },

              selectedColor == color && { borderWidth: 4 },
            ]}
            onPress={() => {
              setSelectedColor(color);
            }}
          ></TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
