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
import { useMeetingIdContext } from "../MeetingIdContext";
import MeetingService from "../meetingService";

const HomePage = ({ navigation }) => {
  const [meetings, setMeetings] = useState([]);
  const { meetingIds } = useMeetingIdContext();

  const calculateVotes = (hasUserVoted) => {
    return hasUserVoted
      ? Object.values(hasUserVoted).filter((voted) => voted).length
      : 0;
  };

  const voteCountText = (meeting) => {
    const votedCount = calculateVotes(meeting.hasUserVoted);
    return `${votedCount}/${meeting.userCount} Voted`;
  };

  const handleDeleteMeeting = (meetingId) => {
    Alert.alert(
      "Delete Meeting",
      "Are you sure you want to delete this meeting?",
      [
        {
          text: "No",
          onPress: () => console.log("Deletion cancelled."),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            MeetingService.deleteMeeting(meetingId);
            console.log(`Meeting with id ${meetingId} deleted.`);
            setMeetings(meetings.filter((meeting) => meeting.id !== meetingId));
          },
        },
      ]
    );
  };

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
        }
      }
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
                    meetingId: meeting.id,
                  })
                }
                style={styles.button}
              >
                <Text style={styles.buttonText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteMeeting(meeting.id)}
              >
                <Ionicons name="trash-outline" size={24} color="red" />
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MeetingConfiguration");
        }}
        style={styles.floatingButton}
      >
        <Ionicons name="calendar" size={24} color="white" />
      </TouchableOpacity>

      {/* Ensure this button is also included as it was in your original code */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CreateTeam");
        }}
        style={styles.leftFloatingButton}
      >
        <Ionicons name="people" size={24} color="white" />
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
    marginBottom: 100,
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
    backgroundColor: "black",
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  leftFloatingButton: {
    backgroundColor: "black",
    position: "absolute",
    bottom: 30,
    left: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffcccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    marginLeft: 5,
    color: "red",
  },
});

export default HomePage;
