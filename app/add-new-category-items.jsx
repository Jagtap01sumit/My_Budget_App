import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import { colors } from "../utils/theme";
import { ThemeContext } from "../context/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";
import { supabase } from "../utils/supabaseConfig";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function AddNewCategoryItems() {
  const placeholder =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgCPQmyPHrOWxnUvbmQIRwOipjW8woZUreA&s";
  const [image, setImg] = useState(placeholder);
  const [previewImage, setPreviewImage] = useState(placeholder);
  const [name, setName] = useState();
  const [cost, setCost] = useState();
  const [uri, setUri] = useState();
  const [note, setNote] = useState();
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const { categoryId } = useLocalSearchParams();
  const router = useRouter();
  console.log(categoryId, "cat_id"); //its null

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      base64: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImg(result.assets[0].base64);
    }
  };

  const OnClickAdd = async () => {
    setLoading(true);
    const fileName = Date.now();
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(`${fileName}.png`, decode(image), {
        contentType: "image/png",
      });

    if (uploadError) {
      console.error("Error uploading file:", uploadError.message);
      ToastAndroid.show("Failed to upload image!", ToastAndroid.SHORT);
      setLoading(false);
      return;
    }

    if (uploadData) {
      const fileUrl = `https://msryjtpbzxtnnllitkhl.supabase.co/storage/v1/object/public/images/${uploadData.path}`;

      console.log("Uploaded file URL:", fileUrl);

      const { data, error } = await supabase
        .from("categoryitems")
        .insert([
          {
            name: name,
            cost: cost,
            url: uri,
            image: fileUrl,
            note: note,
            category_id: categoryId,
          },
        ])
        .select();

      if (error) {
        setLoading(false);
        console.error("Error adding item:", error.message);
        ToastAndroid.show("Failed to add item!", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("New Item Added!!!", ToastAndroid.SHORT);
        setLoading(false);
        console.log(data);

        router.push({
          pathname: "/category-details",
          params: {
            categoryId: categoryId,
          },
        });
      }
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView
        style={{
          padding: 20,
          height: "100%",
          backgroundColor: activeColors.primary,
        }}
      >
        <TouchableOpacity
          onPress={() => onImagePick()}
          // style={{ padding: 10, margin: 10 }}
        >
          <Image
            source={{ uri: previewImage }}
            style={[styles.image, { padding: 10 }]}
          />
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <Ionicons name="pricetag" size={24} color="black" />
          <TextInput
            placeholder="Item name"
            style={styles.input}
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <FontAwesome name="dollar" size={24} color="black" />
          <TextInput
            placeholder="Cost"
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={(value) => setCost(value)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Feather name="link-2" size={24} color="black" />
          <TextInput
            placeholder="Url"
            style={styles.input}
            onChangeText={(value) => setUri(value)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <EvilIcons name="pencil" size={24} color="black" />
          <TextInput
            placeholder="Note"
            style={styles.input}
            numberOfLines={3}
            onChangeText={(value) => setNote(value)}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: activeColors.tertiary }]}
          disabled={!name || !cost || loading}
          onPress={() => OnClickAdd()}
        >
          {loading ? (
            <ActivityIndicator color={activeColors.text} />
          ) : (
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-bold",
                color: activeColors.text,
              }}
            >
              Add
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
  },
  textInputContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
  },
  input: {
    fontSize: 17,
    flex: 1,
  },
  button: {
    padding: 20,
    borderRadius: 99,
    marginTop: 20,
  },
});
