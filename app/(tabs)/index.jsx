import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import service from "../../utils/services";
import { client } from "../../utils/KindeConfig";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    checkUserAuth();
  }, []);
  const checkUserAuth = async () => {
    const result = await service.getData("login");
    console.log(result);
    if (result !== "true") {
      router.push("/login");
    }
  };

  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      await service.storeData("login", "false");
      router.replace("/login"); // User was logged out
    }
  };
  return (
    <View style={{ margin: 10 }}>
      <Text style={{ margin: 10 }}>Home</Text>
      <Button title="logout" onPress={handleLogout}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
