import React from "react";
import { registerIndieID, unregisterIndieDevice } from "native-notify";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { useUserContext } from "../UserContext";

const sendNotificationToUsers = (emails, team) => {
  emails.forEach((email) => {
    axios
      .post(`https://app.nativenotify.com/api/indie/notification`, {
        subID: email, // Use the current email in the iteration
        appId: 20328,
        appToken: "yo2NfEZ8YjS8ZvKH1iQspw",
        title: "Rescheduled meeting",
        message: `Meeting for ${team} has been rescheduled.`, // Template literal for team variable
      })
      .then((response) => {
        console.log(
          `Notification sent successfully to ${email}:`,
          response.data
        );
      })
      .catch((error) => {
        console.error(`Error sending notification to ${email}:`, error);
      });
  });
};

const NotifTest = ({ navigation }) => {
  const { userInfo } = useUserContext();
  const emails = userInfo.map((user) => user.email);
  const team = "CS 301";
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => sendNotificationToUsers(emails, team)}
      >
        <Text style={styles.buttonText}>
          Press here to send notification to your user.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "black",
    padding: 25,
    borderRadius: 10,
  },
  button2: {
    backgroundColor: "pink",
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default NotifTest;
