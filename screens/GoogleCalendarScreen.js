import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import * as Linking from "expo-linking";
import Service from "../service";
import { useUserIdContext } from "../UserIdContext";
import { LinearGradient } from "expo-linear-gradient";

const GoogleCalendarScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  // const API_URL = "http://10.124.137.18:8080/";

  const handleConnectGoogleCalendarButtonClick = async () => {
    // try {
    //   // Make a request to your backend API to connect to Google Calendar
    //   const response = await axios.get(API_URL + `Google/${userId}/startOAuth`);
    //   const link = response.data;

    //   // Handle the response as needed
    //   console.log(link);
    //   alert("Opening Google Authentication")
    //   Linking.openURL(link);
    // } catch (error) {
    //   console.error('Error:', error);
    // }

    try {
      Service.connectGoogleCalendar(userId).then((link) => {
        console.log(link);
        // alert("Opening Google Authentication")
        Linking.openURL(link);
        navigation.navigate("HomePage");
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <LinearGradient colors={["#F5F7FA", "#B8C6DB"]} style={styles.container}>
      <Image source={require("../assets/googleCal.png")} style={styles.icon} />
      <Text style={styles.title}>Connect to Google Calendar</Text>
      <Text style={styles.description}>
        For full functionality, please link your Google Calendar.
      </Text>
      <TouchableOpacity
        onPress={handleConnectGoogleCalendarButtonClick}
        style={styles.button}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Link Google Calendar</Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 20,
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#34495E",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#34495E",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
});
export default GoogleCalendarScreen;
