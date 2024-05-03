import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import service from "../utils/services";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    checkUserAuth();
  }, []);
  const checkUserAuth = async () => {
    const result = await service.getData("login");
    if (result !== "true") {
      router.push("login");
    }
  };
  return (
    <View style={{ margin: 10 }}>
      <Text style={{ margin: 10 }}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
