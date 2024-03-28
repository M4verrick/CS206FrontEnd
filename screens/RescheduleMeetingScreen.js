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
  const [teamId, setTeamId] = useState("");
  const [hasMultipleMeetings, setHasMultipleMeetings] = useState();

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
        setTeamId(meetingDetails.meetingTeamId);
        if (meetingDetails.otherMeetingsIds.length == 0){
          setHasMultipleMeetings(false)
        } else {
          setHasMultipleMeetings(true)
        }

      } catch (error) {
        console.error("Failed to load meeting or team details:", error);
      }
    };

    loadMeetingData();
  }, [meetingId]);

  const handleRescheuleAllMeetings = () => {
    try {
      MeetingService.rescheduleMeetingForConsecutive(meetingId)
      console.log("Rescheduling All Meetings")
    } catch (error){
      console.log("Failed to reschedule all meetings")
    }
    // console.log("Reschedule All Meeting");
    navigation.navigate("MeetingConfiguration");
  };

  const handleRescheduleMeeting = () => {
    try {
      MeetingService.rescheduleMeeting(meetingId)
      console.log("Rescheduling Single Meetings")
    } catch (error){
      console.log("Failed to reschedule all meetings")
    }
    // console.log("Reschedule All Meeting");
    navigation.navigate("MeetingConfiguration");
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
        {hasMultipleMeetings ? ( // Check if hasMultipleMeetings is true
          <>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={handleRescheduleMeeting}
            >
              {/* <Ionicons name="checkmark-circle" size={24} color="white" /> */}
              <Text style={styles.buttonText}>Reschedule Single Meeting</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.declineButton]}
              onPress={handleRescheuleAllMeetings}
            >
              {/* <Ionicons name="close-circle" size={24} color="white" /> */}
              <Text style={styles.buttonText}>Reschedule All Meetings</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={handleRescheduleMeeting}
          >
            <Ionicons name="checkmark-circle" size={24} color="white" />
            <Text style={styles.buttonText}>Reschedule Single Meeting</Text>
          </TouchableOpacity>
        )}
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
    flexDirection: "column", // Change to column direction
    justifyContent: "center", // Center the buttons vertically
    alignItems: "center", // Center the buttons horizontally
    width: "120%",
    marginTop: 20, // Add margin to create space between the buttons
  },
  
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10, // Add margin bottom to create space between buttons
  },
  confirmButton: {
    backgroundColor: "black",
  },
  declineButton: {
    backgroundColor: "black",
  },
  buttonText: {
    marginLeft: 10,
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default RescheduleMeetingScreen;
