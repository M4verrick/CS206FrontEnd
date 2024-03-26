import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MeetingService from "../meetingService"; // Ensure this path matches where your service is located
import Service from "../service";
const MeetingSuccessScreen = ({ route }) => {
  const { meetingId } = route.params;

  // State to hold meeting details
  const [meeting, setMeeting] = useState({
    meetingName: "",
    meetingStartDateTime: "",
    meetingEndDateTime: "",
    totalUsers: 0,
    attendingUsers: 0,
  });
  const [team, setTeamDetails] = useState("");
  const [otherMeetingsDetails, setOtherMeetingsDetails] = useState([]);

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        // Fetch details for the main meeting
        const meetingDetails = await MeetingService.getMeeting(meetingId);
        const team = await Service.getTeamById(meetingDetails.meetingTeamId);
        const totalUsers = Object.keys(meetingDetails.hasUserVoted).length;
        const timeslotKey = `${meetingDetails.meetingStartDateTime}_${meetingDetails.meetingEndDateTime}`;
        const attendingUsers =
          meetingDetails.meetingAvailabilities[timeslotKey] || 0;

        setMeeting({
          ...meetingDetails,
          totalUsers,
          attendingUsers,
        });
        setTeamDetails(team.teamName);

        // Fetch details for other meetings if they exist
        if (meetingDetails.otherMeetingIds) {
          const otherMeetingsPromises = meetingDetails.otherMeetingIds.map(
            async (id) => {
              const otherMeetingDetails = await MeetingService.getMeeting(id);
              const otherMeetingTeam = await Service.getTeamById(
                otherMeetingDetails.meetingTeamId
              );
              const otherTotalUsers = Object.keys(
                otherMeetingDetails.hasUserVoted
              ).length;
              const otherTimeslotKey = `${otherMeetingDetails.meetingStartDateTime}_${otherMeetingDetails.meetingEndDateTime}`;
              const otherAttendingUsers =
                otherMeetingDetails.meetingAvailabilities[otherTimeslotKey] ||
                0;

              return {
                ...otherMeetingDetails,
                teamName: otherMeetingTeam.teamName,
                totalUsers: otherTotalUsers,
                attendingUsers: otherAttendingUsers,
              };
            }
          );

          const otherMeetingsDetails = await Promise.all(otherMeetingsPromises);
          setOtherMeetingsDetails(otherMeetingsDetails);
        }
      } catch (error) {
        console.error("Failed to fetch meeting details:", error);
      }
    };

    fetchMeetingDetails();
  }, [meetingId]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Successful!</Text>
      <Text style={styles.meetingName}>{meeting.meetingName}</Text>

      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Meeting Details</Text>

        <View style={styles.detailRow}>
          <Ionicons name="people" size={24} color="black" />
          <Text style={styles.detailText}>{team}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={24} color="black" />
          <Text style={styles.detailText}>
            Meeting Date{" "}
            {new Date(meeting.meetingStartDateTime).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="time" size={24} color="black" />
          <Text style={styles.detailText}>
            Meeting Time{" "}
            {new Date(meeting.meetingStartDateTime).toLocaleTimeString()} -{" "}
            {new Date(meeting.meetingEndDateTime).toLocaleTimeString()}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="stats-chart" size={24} color="black" />
          <Text style={styles.detailText}>
            Attendance {meeting.attendingUsers} / {meeting.totalUsers}
          </Text>
        </View>
        {/* Render other meetings details if they exist */}
        {otherMeetingsDetails.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Other Meetings Details:</Text>
            {otherMeetingsDetails.map((meeting, index) => (
              <View key={index} style={styles.detailsCard}>
                <Text style={styles.detailText}>Team: {meeting.teamName}</Text>
                <Text style={styles.detailText}>
                  Meeting Date:{" "}
                  {new Date(meeting.meetingStartDateTime).toLocaleDateString()}
                </Text>
                <Text style={styles.detailText}>
                  Meeting Time:{" "}
                  {new Date(meeting.meetingStartDateTime).toLocaleTimeString()}{" "}
                  - {new Date(meeting.meetingEndDateTime).toLocaleTimeString()}
                </Text>
                <Text style={styles.detailText}>
                  Attendance: {meeting.attendingUsers} / {meeting.totalUsers}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* The button for adding to calendar can be uncommented and implemented as needed */}
        {/* <TouchableOpacity style={styles.button} onPress={handleAddToCalendar}>
          <Text style={styles.buttonText}>Add event to Calendar</Text>
        </TouchableOpacity> */}
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
