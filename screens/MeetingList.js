import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useMeetingIdContext } from "../MeetingIdContext";

const MeetingList = ({ navigation }) => {
  const [meetings, setMeetings] = useState([]);
  const { meetingIds } = useMeetingIdContext(); // Assuming you're storing meeting IDs here

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const meetingsData = await Promise.all(
          meetingIds.map((id) =>
            axios.get(`${API_URL}meeting/${id}/getMeeting`, {
              withCredentials: true,
            })
          )
        );
        setMeetings(meetingsData.map((response) => response.data));
      } catch (error) {
        console.error("Error fetching meetings:", error);
        Alert.alert("Error", "Could not fetch meetings.");
      }
    };

    fetchMeetings();
  }, [meetingIds]); // Re-run when meetingIds changes

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {meetings.map((meeting) => (
          <View key={meeting.id} style={styles.meetingCard}>
            <Text style={styles.courseText}>{meeting.meetingName}</Text>
            <Text style={styles.descriptionText}>
              Start: {meeting.meetingStartDateTime.toString()} - End:{" "}
              {meeting.meetingEndDateTime.toString()}
            </Text>
            {/* Render other meeting details as needed */}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          /* handle new meeting */
        }}
        style={styles.floatingButton}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  meetingsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  meetingCard: {
    backgroundColor: "#f7f7f7",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  courseText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 14,
    color: "#555",
  },
  timeText: {
    fontSize: 12,
    color: "#999",
  },
  votesText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  button: {
    marginTop: 10,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  floatingButton: {
    backgroundColor: "blue",
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MeetingList;
