import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

import loginBg from "../../assets/images/loginBg.png";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../utils/theme";
import { client } from "../../utils/KindeConfig";
import service from "../../utils/services";
import { useRouter } from "expo-router";

export default function index() {
  const { theme, setTheme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const router = useRouter();
  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      await service.storeData("login", "true");
      router.replace("/");
    }
  };
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        backgroundColor: activeColors.tertiary,
      }}
    >
      <Image source={loginBg} style={styles.bgImage} />
      <View
        style={{
          backgroundColor: activeColors.primary,
          height: "100%",
          width: "100%",
          padding: 20,
          marginTop: -30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: activeColors.tertiary,
            fontSize: 35,
          }}
        >
          Personally Budget Planner
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: activeColors.tertiary,
            marginTop: 20,
          }}
        >
          Stay on Track, Event by Event: Your Personal Budget Planner
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: activeColors.tertiary,
            paddingHorizontal: 5,
            padding: 20,
            alignItems: "center",
            borderRadius: 99,
            marginTop: 30,
          }}
          onPress={handleSignIn}
        >
          <Text style={{ textAlign: "center", color: activeColors.primary }}>
            Login/Signup
          </Text>
        </TouchableOpacity>
        <Text
          style={{ fontSize: 13, color: activeColors.tertiary, marginTop: 10 }}
        >
          * By login/sighup you will agree our terms and conditions
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    width: 200,
    height: 400,
    marginTop: 70,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "black",
  },
});
