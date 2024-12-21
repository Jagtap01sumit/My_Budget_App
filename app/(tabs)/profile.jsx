import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import Header from "../../components/Header";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../utils/theme";
import ToggleSwitch from "toggle-switch-react-native";
import PrivacyCon from "../../components/prfileComp/PrivacyCon";

export default function Profile() {
  const { theme, setTheme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const [isOn, setIsOn] = useState(theme.mode === "dark");
  const [currentView, setCurrentView] = useState("main");
  const [animationValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [currentView]);

  const toggleTheme = () => {
    setTheme((prevTheme) => ({
      mode: prevTheme.mode === "dark" ? "light" : "dark",
    }));
    setIsOn(!isOn);
  };

  const switchView = (view) => {
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setCurrentView(view);
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  const slideIn = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const fade = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
      <Header />
      <View
        style={[
          styles.innerContainer,
          { backgroundColor: activeColors.secondary },
        ]}
      >
        <Animated.View
          style={{
            opacity: fade,
            transform: [{ translateY: slideIn }],
          }}
        >
          {currentView === "main" && (
            <View>
              <View
                style={[
                  styles.option,
                  { backgroundColor: activeColors.primary, borderRadius: 8 },
                ]}
              >
                <View style={styles.settingRow}>
                  <Text
                    style={[styles.optionText, { color: activeColors.text }]}
                  >
                    Dark Mode Setting
                  </Text>
                  <ToggleSwitch
                    isOn={isOn}
                    offColor="#D1D1D6"
                    onColor="gray"
                    size="medium"
                    onToggle={toggleTheme}
                    animationSpeed={300}
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={() => switchView("privacy")}
                style={[
                  styles.option,
                  { backgroundColor: activeColors.primary },
                ]}
              >
                <Text style={[styles.optionText, { color: activeColors.text }]}>
                  Privacy Terms and Conditions
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => switchView("profile")}
                style={[
                  styles.option,
                  { backgroundColor: activeColors.primary },
                ]}
              >
                <Text style={[styles.optionText, { color: activeColors.text }]}>
                  Go to Profile
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {currentView === "privacy" && (
            <View style={[{ backgroundColor: activeColors.secondary }]}>
              <PrivacyCon switchView={switchView} />
            </View>
          )}

          {currentView === "profile" && (
            <View>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => switchView("main")}
              >
                <Text style={[styles.backText, { color: activeColors.text }]}>
                  Back
                </Text>
              </TouchableOpacity>

              <Text
                style={[styles.placeholderText, { color: activeColors.text }]}
              >
                Profile Section Coming Soon
              </Text>
            </View>
          )}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  innerContainer: {
    flex: 1,
    marginVertical: 30,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingText: {
    fontSize: 16,
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "500",
  },

  placeholderText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },

  backText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
