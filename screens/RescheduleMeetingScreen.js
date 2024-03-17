// screens/RescheduleMeetingScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const RescheduleMeetingScreen = ({ navigation }) => {
  const handleRescheduleConfirm = () => {
    // TODO: Implement the reschedule logic
    console.log("Reschedule confirmed");
  };

  const handleRescheduleDecline = () => {
    // Take the user back to the previous screen
    navigation.goBack();
    console.log("Reschedule declined");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Reschedule Meeting for CS 301? </Text>
        <Text style={styles.warning}>
          WARNING: This action cannot be undone!
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleRescheduleConfirm}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleRescheduleDecline}
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080", // Semi-transparent background
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    paddingBottom: 20,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  warning: {
    fontSize: 15,
    color: "red",
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    paddingTop: 20,
  },
  button: {
    backgroundColor: "#E8E8E8",
    padding: 10,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default RescheduleMeetingScreen;
