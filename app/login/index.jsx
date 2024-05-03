import { StyleSheet, Text, View, Image } from "react-native";

import loginBg from "../../assets/images/loginBg.png";

export default function index() {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image source={loginBg} style={styles.bgImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    width: 200,
    height: 400,
    marginTop: 30,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "black",
  },
});
