import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Assuming Service and MeetingService are correctly implemented to return the relevant data
import Service from "../service";
import MeetingService from "../meetingService";

const screenWidth = Dimensions.get("window").width;

const RescheduleMeetingScreen = ({ route, navigation }) => {
  const { meetingId } = route.params;
  const [teamName, setTeamName] = useState("");
  const [meetingName, setMeetingName] = useState("");

  useEffect(() => {
    const loadMeetingData = async () => {
      try {
        // Get the meeting details using the meeting ID
        const meetingDetails = await MeetingService.getMeeting(meetingId);
        console.log(meetingDetails);

        // Use the team ID from the meeting details to get the team name
        const teamDetails = await Service.getTeamById(
          meetingDetails.meetingTeamId
        );
        setTeamName(teamDetails.teamName); // Update state with the team name
        setMeetingName(meetingDetails.meetingName);
      } catch (error) {
        console.error("Failed to load meeting or team details:", error);
      }
    };

    loadMeetingData();
  }, [meetingId]);

  const handleRescheduleConfirm = () => {
    console.log("Reschedule confirmed");
    navigation.navigate("MeetingList");
  };

  const handleRescheduleDecline = () => {
    navigation.goBack();
    console.log("Reschedule declined");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="calendar" size={60} color="#4e5d78" />
        <Text style={styles.title}>
          Reschedule {meetingName} for {teamName}?
        </Text>
        <Text style={styles.warning}>
          WARNING: This action cannot be undone.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={handleRescheduleConfirm}
          >
            <Ionicons name="checkmark-circle" size={24} color="white" />
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.declineButton]}
            onPress={handleRescheduleDecline}
          >
            <Ionicons name="close-circle" size={24} color="white" />
            <Text style={styles.buttonText}>Cancel</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Darker semi-transparent background
  },
  card: {
    marginBottom: "auto",
    marginTop: 220,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    width: screenWidth * 0.85,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    marginTop: 20,
    fontWeight: "600",
    fontSize: 22,
    color: "#4e5d78",
    textAlign: "center",
  },
  warning: {
    fontSize: 16,
    color: "#e63946",
    fontWeight: "600",
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#2a9d8f",
  },
  declineButton: {
    backgroundColor: "#e63946",
  },
  buttonText: {
    marginLeft: 10,
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default RescheduleMeetingScreen;
