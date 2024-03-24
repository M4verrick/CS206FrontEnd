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
  const [meetings, setMeetings] = useState([]);
  const { meetingIds } = useMeetingIdContext();
  // Function to calculate the vote count
  const calculateVotes = (hasUserVoted) => {
    return Object.values(hasUserVoted).filter((voted) => voted).length;
  };
  const voteCountText = (meeting) => {
    const votedCount = calculateVotes(meeting.hasUserVoted);
    return `${votedCount}/${meeting.userCount} Voted`;
  };

  // Simple date formatter function - you can replace it with a more robust solution
  const formatDate = (dateString) => {
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

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
      // Assuming that all meetings are either upcoming or pending, categorize accordingly
      setMeetings(fetchedMeetings);
    };

    fetchMeetings();
  }, [meetingIds]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
        {meetings
          .filter((m) => m.isMeetingSet)
          .map((meeting) => (
            <View key={meeting.id} style={styles.meetingCard}>
              <Text style={styles.courseText}>{meeting.meetingName}</Text>
              <Text style={styles.descriptionText}>
                {formatDate(meeting.meetingStartDateTime)} -{" "}
                {formatDate(meeting.meetingEndDateTime)}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RescheduleMeeting", {
                    teamName: meeting.meetingName,
                  })
                }
                style={styles.button}
              >
                <Text style={styles.buttonText}>Reschedule</Text>
              </TouchableOpacity>
            </View>
          ))}

        <Text style={styles.sectionTitle}>Pending Meetings</Text>
        {meetings
          .filter((m) => !m.isMeetingSet)
          .map((meeting) => (
            <View key={meeting.id} style={styles.meetingCard}>
              <Text style={styles.courseText}>{meeting.meetingName}</Text>
              {/* Use the voteCountText function to display the number of votes */}
              <Text style={styles.votesText}>{voteCountText(meeting)}</Text>
            </View>
          ))}
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
