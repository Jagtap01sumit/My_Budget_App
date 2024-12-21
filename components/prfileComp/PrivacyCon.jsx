import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../utils/theme";
import { TouchableOpacity } from "react-native";

const PrivacyCon = ({ switchView }) => {
  const { theme } = useContext(ThemeContext);
  const [activeButton, setActiveButton] = useState("HumanFriendly");
  const navigation = useNavigation();
  let activeColors = colors[theme.mode];
  return (
    <SafeAreaView style={{ backgroundColor: activeColors.primary }}>
      <ScrollView style={{ margin: 10 }}>
        <Pressable onPress={() => navigation.goBack()}></Pressable>
        <View style={{ display: "flex" }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => switchView("main")}
          >
            <Text style={[styles.backText, { color: activeColors.text }]}>
              Back
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: activeColors.text,
            }}
          >
            Privacy Policy
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            // marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 7,
              backgroundColor:
                activeButton === "HumanFriendly" ? "grey" : "white",
              width: 145,
              borderRadius: 20,
            }}
            onPress={() => setActiveButton("HumanFriendly")}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: activeButton === "HumanFriendly" ? "white" : "grey",
                }}
              >
                Human Friendly
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: activeButton === "Legal" ? "grey" : "white",
              width: 145,
              borderRadius: 20,
            }}
            onPress={() => setActiveButton("Legal")}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: activeButton === "Legal" ? "white" : "grey",
                }}
              >
                Legal
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              backgroundColor: activeColors.secondary,
              padding: 8,
              margin: 8,
              height: 350,
              borderRadius: 9,
            }}
          >
            <ScrollView
              style={{
                backgroundColor: activeColors.secondary,
              }}
            >
              {activeButton === "HumanFriendly" ? (
                <View>
                  <Text
                    style={{
                      fontSize: 25,
                      color: activeColors.text,
                      fontWeight: "bold",
                    }}
                  >
                    Information Collection and Use
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      marginTop: 10,
                      color: activeColors.text,
                    }}
                  >
                    We do not collect personally identifiable information about
                    you. However, the App may collect certain information
                    automatically, including, but not limited to, the type of
                    mobile device you use, your mobile operating system, and
                    information about the way you use the App. This information
                    is used solely for the purpose of improving the
                    functionality and performance of the App.
                  </Text>
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: 25,
                      color: activeColors.text,
                      fontWeight: "bold",
                    }}
                  >
                    Device Usage Data
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      marginTop: 10,
                      color: activeColors.text,
                    }}
                  >
                    The App may collect data related to your mobile device
                    usage, including screen time, time spent on specific
                    applications, and the distance between your mobile device
                    and your eyes. This data is collected anonymously and is
                    used to provide insights into your eye strength and to
                    deliver personalized notifications and suggestions to
                    improve eye health.
                  </Text>
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: 25,
                      color: activeColors.text,
                      fontWeight: "bold",
                    }}
                  >
                    Location Data
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      marginTop: 10,
                      color: activeColors.text,
                    }}
                  >
                    We do not collect precise location data from your mobile
                    device.
                  </Text>
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: 25,
                      color: activeColors.text,
                      fontWeight: "bold",
                    }}
                  >
                    Data Sharing and Disclosure
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      marginTop: 10,
                      color: activeColors.text,
                    }}
                  >
                    We do not sell, trade, or otherwise transfer your personally
                    identifiable information to third parties. However, we may
                    share aggregated and anonymized data with third-party
                    service providers for the purpose of analytics and improving
                    the functionality of the App.
                  </Text>
                </View>
              ) : (
                <View>
                  <Text
                    style={{
                      fontSize: 23,
                      color: activeColors.text,
                      fontWeight: "bold",
                    }}
                  >
                    Legal
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      marginTop: 10,
                      color: activeColors.text,
                    }}
                  >
                    The information provided in this Privacy Policy is for
                    general informational purposes only. While we strive to keep
                    the information up to date and accurate, we make no
                    representations or warranties of any kind, express or
                    implied, about the completeness, accuracy, reliability,
                    suitability, or availability with respect to the App or the
                    information, products, services, or related graphics
                    contained in this Privacy Policy for any purpose. Any
                    reliance you place on such information is therefore strictly
                    at your own risk.
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      marginTop: 10,
                      color: activeColors.text,
                    }}
                  >
                    In no event will we be liable for any loss or damage
                    including without limitation, indirect or consequential loss
                    or damage, or any loss or damage whatsoever arising from
                    loss of data or profits arising out of, or in connection
                    with, the use of this App.
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      marginTop: 10,
                      color: activeColors.text,
                    }}
                  >
                    In no event will we be liable for any loss or damage
                    including without limitation, indirect or consequential loss
                    or damage, or any loss or damage whatsoever arising from
                    loss of data or profits arising out of, or in connection
                    with, the use of this App.
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      marginTop: 10,
                      color: activeColors.text,
                    }}
                  >
                    Through this App, you are able to link to other websites and
                    applications which are not under our control. We have no
                    control over the nature, content, and availability of those
                    sites or applications. The inclusion of any links does not
                    necessarily imply a recommendation or endorse the views
                    expressed within them.
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      marginTop: 10,
                      color: activeColors.text,
                    }}
                  >
                    Every effort is made to keep the App up and running
                    smoothly. However, we take no responsibility for, and will
                    not be liable for, the App being temporarily unavailable due
                    to technical issues beyond our control.
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      marginTop: 10,
                      color: activeColors.text,
                    }}
                  >
                    By using the App, you acknowledge and agree that it is your
                    responsibility to review this Privacy Policy periodically
                    and become aware of modifications.
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
          <View>
            <Text
              style={{
                fontSize: 30,
                marginTop: 20,
                fontWeight: "bold",
                color: activeColors.text,
              }}
            >
              Last Updated
            </Text>
            <Text
              style={{
                fontSize: 11,
                marginTop: 10,
                color: activeColors.text,
              }}
            >
              This Privacy Policy was last updated on 01 Apr 2024. Any changes
              to this policy will be reflected on this page, and the revised
              version will become effective immediately upon posting. We
              encourage you to review this Privacy Policy periodically to stay
              informed about how we are protecting the personal information we
              collect. Your continued use of the App constitutes your acceptance
              of the updated Privacy Policy.
            </Text>
            <Text
              style={{
                fontSize: 30,
                marginTop: 20,
                fontWeight: "bold",
                color: activeColors.text,
              }}
            >
              Changes to This Privacy Policy
            </Text>
            <Text
              style={{
                fontSize: 11,
                marginTop: 10,
                color: activeColors.text,
              }}
            >
              We may update our Privacy Policy from time to time. Thus, you are
              advised to review this page periodically for any changes. We will
              notify you of any changes by posting the new Privacy Policy on
              this page. These changes are effective immediately after they are
              posted on this page.
            </Text>
            <Text
              style={{
                fontSize: 30,
                marginTop: 20,
                fontWeight: "bold",
                color: activeColors.text,
              }}
            >
              Contact Us
            </Text>
            <Text
              style={{
                fontSize: 11,
                marginTop: 10,
                color: activeColors.text,
              }}
            >
              If you have any questions or suggestions about our Privacy Policy,
              do not hesitate to contact us at 91896712782 or
              planmybudget@gmail.conm.
            </Text>
            <Text
              style={{
                fontSize: 11,
                marginTop: 30,
                color: activeColors.text,
              }}
            >
              By using the App, you signify your acceptance of this Privacy
              Policy. If you do not agree to this policy, please do not use our
              App.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyCon;

const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
});
