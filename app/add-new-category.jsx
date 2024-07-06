import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../utils/theme";
import ColorPicker from "../components/ColorPicker";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { supabase } from "../utils/supabaseConfig";
import { client } from "../utils/KindeConfig";
import { useRouter } from "expo-router";

export default function AddNewCategory() {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const [selectedIcon, setSelectedIcon] = useState("IC");
  const [selectedColor, setSelectedColor] = useState(activeColors.primary);
  const [categoryName, setCategoryName] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const router = useRouter();
  const onCreateCategory = async () => {
    const user = await client.getUserDetails();

    const { data, error } = await supabase
      .from("category")
      .insert([
        {
          name: categoryName,
          assigned_budget: totalBudget,
          icons: selectedIcon,
          color: selectedColor,
          created_by: user.email,
        },
      ])
      .select();

    console.log(data, "data");
    if (data) {
      router.replace({
        pathname: "/category-details",
        params: {
          categoryId: data[0].id,
        },
      });
      ToastAndroid.show("Category Created Successfully", ToastAndroid.SHORT);
      setCategoryName("");
      setTotalBudget("");
      setSelectedIcon("");
    } else {
      ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.SHORT);
    }
  };

  return (
    <View
      style={{
        // marginTop: 20,
        padding: 20,
        height: "100%",
        backgroundColor: activeColors.secondary,
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
          onChangeText={(value) => setSelectedIcon(value)}
          value={selectedIcon}
        />
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={(color) => setSelectedColor(color)}
        />
      </View>

      <View style={styles.inputView}>
        <MaterialIcons
          name="local-offer"
          size={24}
          color={activeColors.tertiary}
        />
        <TextInput
          placeholder="Category Name"
          style={{
            width: "100%",
            padding: 2,
            fontSize: 20,
          }}
          onChangeText={(val) => setCategoryName(val)}
          value={categoryName}
        />
      </View>
      <View style={styles.inputView}>
        <Foundation name="dollar" size={32} color="gray" />
        <TextInput
          placeholder="Total Budget"
          keyboardType="numeric"
          style={{
            width: "100%",
            padding: 2,
            fontSize: 20,
          }}
          onChangeText={(val) => setTotalBudget(val)}
          value={totalBudget}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: activeColors.primary }]}
        disabled={!categoryName || !totalBudget}
        onPress={onCreateCategory}
      >
        <Text
          style={{
            color: activeColors.text,
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Create
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconInput: {
    textAlign: "center",
    fontSize: 30,
    padding: 20,
    borderRadius: 99,
    paddingHorizontal: 28,
    color: "white",
  },
  inputView: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 4,
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
    borderColor: "gray",
    backgroundColor: "white",
    alignItems: "center",
  },
  button: {
    borderRadius: 10,
    padding: 15,
    marginTop: 30,
  },
});
