import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { act, useContext, useState } from "react";
import { colors } from "../../utils/theme";
import { ThemeContext } from "../../context/ThemeContext";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { TouchableOpacity } from "react-native";
import { supabase } from "../../utils/supabaseConfig";
export default function CourseItemList({ categoryData, setUpdatedRecord }) {
  const [expandItem, setExpandItems] = useState();
  console.log(categoryData.categoryitems, "catdata");
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const onDeleteItem = async (id) => {
    const { error } = await supabase
      .from("categoryitems")
      .delete()
      .eq("id", id);
    ToastAndroid.show("Item Deleted!", ToastAndroid.SHORT);
    setUpdatedRecord(true);
  };

  const openURL = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.heading, { color: activeColors.text }]}>
        Item List
      </Text>
      <View style={{ marginTop: 15 }}>
        {categoryData?.categoryitems?.length > 0 ? (
          categoryData.categoryitems.map((item, inx) => {
            return (
              <View key={inx}>
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => setExpandItems(inx)}
                >
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={[styles.name, { color: activeColors.text }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.url, { color: activeColors.text }]}>
                      {item.url}
                    </Text>
                  </View>
                  <Text style={[styles.cost, { color: activeColors.text }]}>
                    $ {item.cost}
                  </Text>
                </TouchableOpacity>
                {expandItem == inx && (
                  <View style={styles.actionItemContainer}>
                    <EvilIcons
                      name="trash"
                      size={28}
                      color="red"
                      onPress={() => onDeleteItem(item.id)}
                    />
                    <Feather
                      name="external-link"
                      onPress={() => openURL(item.url)}
                      size={24}
                      color="blue"
                    />
                  </View>
                )}
                {categoryData.categoryitems.length - 1 !== inx && (
                  <View
                    style={{
                      borderWidth: 0.5,
                      marginBottom: 10,
                      borderColor: "grey",
                      marginTop: 10,
                    }}
                  />
                )}
              </View>
            );
          })
        ) : (
          <Text style={styles.itemtext}>No items found</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 15,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  url: {
    fontFamily: "outfit",
  },
  cost: {
    fontSize: 17,
    fontFamily: "outfit-bold",
    marginLeft: 10,
  },
  itemtext: {
    fontFamily: "outfit-bold",
    fontSize: 25,
    color: "gray",
  },
  actionItemContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-end",
  },
});
