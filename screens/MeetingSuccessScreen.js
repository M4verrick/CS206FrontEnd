import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MeetingSuccessScreen = () => {
  const handleAddToCalendar = () => {
    // TODO: Implement functionality to add event to the calendar
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Successful!</Text>
      <Text style={styles.meetingName}>CS301 Meeting</Text>

      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Meeting Details</Text>

        <View style={styles.detailRow}>
          <Ionicons name="people" size={24} color="black" />
          <Text style={styles.detailText}>Group CS301</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={24} color="black" />
          <Text style={styles.detailText}>Meeting Date 18/01/24</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="time" size={24} color="black" />
          <Text style={styles.detailText}>Meeting Time 11am - 1pm</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="stats-chart" size={24} color="black" />
          <Text style={styles.detailText}>Attendance 5/5</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddToCalendar}>
          <Text style={styles.buttonText}>Add event to Calendar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50, // Adjust the padding as needed
    backgroundColor: "white",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  meetingName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 30,
  },
  detailsCard: {
    width: "90%",
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  // Add any additional styles you need here
});

export default MeetingSuccessScreen;
