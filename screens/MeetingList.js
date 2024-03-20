import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MeetingList = ({ navigation }) => {
  // Dummy data for the meetings
  const upcomingMeetings = [
    {
      id: 1,
      course: "CS 206",
      description: "Weekly Meeting",
      date: "17/01/24",
      time: "1100 - 1200",
    },
    // ... add other meetings
  ];

  const pendingMeetings = [
    {
      id: 4,
      course: "CS 101",
      description: "First Meeting",
      status: "Pending Timing",
      votes: "4/6 Voted",
    },
    // ... add other meetings
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.meetingsContainer}>
          <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
          {upcomingMeetings.map((meeting) => (
            <View key={meeting.id} style={styles.meetingCard}>
              <Text style={styles.courseText}>{meeting.course}</Text>
              <Text style={styles.descriptionText}>{meeting.description}</Text>
              <Text style={styles.timeText}>
                {meeting.date} {meeting.time}
              </Text>
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
              <Text style={styles.courseText}>{meeting.course}</Text>
              <Text style={styles.descriptionText}>
                {meeting.description} - {meeting.status}
              </Text>
              <Text style={styles.votesText}>{meeting.votes}</Text>
            </View>
          ))}
        </View>
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
