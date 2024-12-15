import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../utils/theme";
import { supabase } from "../../utils/supabaseConfig";

export default function HistoryPage() {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animationValues, setAnimationValues] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("categoryitems")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching transactions:", error.message);
      } else {
        setTransactions(data);
        const animations = data.map(() => new Animated.Value(0));
        setAnimationValues(animations);
      }
      setLoading(false);
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (animationValues.length > 0) {
      Animated.stagger(
        200, // Delay between animations
        animationValues.map((anim) =>
          Animated.timing(anim, {
            toValue: 1, // Final value
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          })
        )
      ).start();
    }
  }, [animationValues]);

  const renderTransactionItem = ({ item, index }) => {
    const animationStyle = {
      opacity: animationValues[index],
      transform: [
        {
          translateY: animationValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0],
          }),
        },
      ],
    };

    return (
      <Animated.View
        style={[
          styles.transactionItem,
          { backgroundColor: activeColors.secondary },
          animationStyle,
        ]}
      >
        <View style={styles.transactionDetails}>
          <View style={styles.leftSection}>
            <Text style={[styles.name, { color: activeColors.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.date, { color: activeColors.text }]}>
              {new Date(item.created_at).toLocaleString()}
            </Text>
          </View>
          <Text style={[styles.amount, { color: activeColors.text }]}>
            ${item.cost}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
      <Text style={[styles.header, { color: activeColors.text }]}>
        Transaction History
      </Text>
      {loading ? (
        <Text style={[styles.loading, { color: activeColors.text }]}>
          Loading...
        </Text>
      ) : transactions.length > 0 ? (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTransactionItem}
        />
      ) : (
        <Text style={[styles.noData, { color: activeColors.text }]}>
          No transactions found
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  transactionItem: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  transactionDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flex: 1,
  },
  name: {
    fontSize: 21,
    fontWeight: "bold",
  },
  date: {
    fontSize: 9,
    color: "gray",
  },
  amount: {
    fontSize: 19,
    fontWeight: "500",
  },
  noData: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  loading: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
});
