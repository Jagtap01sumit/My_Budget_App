import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { act, useContext } from "react";
import { colors } from "../../utils/theme";
import { ThemeContext } from "../../context/ThemeContext";

export default function CourseItemList({ categoryData }) {
  console.log(categoryData.categoryitems, "catdata");
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
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
                <View style={styles.itemContainer}>
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
                </View>
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
});
