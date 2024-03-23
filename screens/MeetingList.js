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
import { useMeetingIdContext } from "../MeetingIdContext"; // Ensure the correct path is used
import MeetingService from "../meetingService"; // Import your getMeeting function

const MeetingList = ({ navigation }) => {
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [pendingMeetings, setPendingMeetings] = useState([]);
  const { meetingIds } = useMeetingIdContext();

  useEffect(() => {
    const fetchMeetings = async () => {
      const fetchedMeetings = [];
      for (let id of meetingIds) {
        try {
          const meeting = await MeetingService.getMeeting(id);
          fetchedMeetings.push(meeting);
        } catch (error) {
          console.error("Error fetching meeting:", error);
          // Optionally handle the error e.g., by setting an error state or showing an alert
        }
      }

      // Categorize meetings into upcoming and pending
      const upcoming = fetchedMeetings.filter((m) => m.isMeetingSet);
      const pending = fetchedMeetings.filter((m) => !m.isMeetingSet);
      setUpcomingMeetings(upcoming);
      setPendingMeetings(pending);
    };

    fetchMeetings();
  }, [meetingIds]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.meetingsContainer}>
          <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
          {upcomingMeetings.map((meeting) => (
            <View key={meeting.id} style={styles.meetingCard}>
              <Text style={styles.courseText}>{meeting.meetingName}</Text>
              {/* Format the dates as needed */}
              <Text style={styles.descriptionText}>{meeting.description}</Text>
              {/* Add appropriate fields based on your actual meeting object */}
              <TouchableOpacity
                onPress={() => navigation.navigate("RescheduleMeeting")}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Reschedule</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.meetingsContainer}>
          <Text style={styles.sectionTitle}>Pending Meetings</Text>
          {pendingMeetings.map((meeting) => (
            <View key={meeting.id} style={styles.meetingCard}>
              <Text style={styles.courseText}>{meeting.meetingName}</Text>
              {/* Add appropriate fields based on your actual meeting object */}
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          /* Implement the logic for creating a new meeting */
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
