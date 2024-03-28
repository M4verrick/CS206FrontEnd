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

  const handleDeleteMeeting = (meetingId) => {
    Alert.alert(
      "Delete Meeting",
      "Are you sure you want to delete this meeting?",
      [
        {
          text: "No",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            MeetingService.deleteMeeting(meetingId);
            setMeetings(meetings.filter((meeting) => meeting.id !== meetingId));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
        {meetings.map((meeting) => (
          <View key={meeting.id} style={styles.meetingCard}>
            <Text style={styles.courseText}>{meeting.meetingName}</Text>
            <Text style={styles.descriptionText}>
              {formatDate(meeting.meetingStartDateTime)} - {formatDate(meeting.meetingEndDateTime)}
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
        onPress={() => navigation.navigate("MeetingConfiguration")}
        style={styles.floatingButton}
      >
        <Ionicons name="calendar" size={30} color="white" />
        <Text style={styles.buttonLabel}>Meeting Config</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("CreateTeam")}
        style={styles.leftFloatingButton}
      >
        <Ionicons name="people" size={30} color="white" />
        <Text style={styles.buttonLabel}>Create Team</Text>
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
  button: {
    marginTop: 10,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    textAlign: "center",
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
  floatingButton: {
  backgroundColor: "black",
  position: "absolute",
  bottom: 30,
  right: 30,
  width: 70, // Increased size
  height: 70, // Increased size
  borderRadius: 35, // Half the width/height to maintain the circle shape
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
  padding: 8, // Padding for the text
  },
  leftFloatingButton: {
  backgroundColor: "black",
  position: "absolute",
  bottom: 30,
  left: 30,
  width: 70, // Increased size
  height: 70, // Increased size
  borderRadius: 35, // Half the width/height to maintain the circle shape
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
  padding: 8, // Padding for the text
  },
  buttonLabel: {
  color: "white",
  fontSize: 12,
  textAlign: "center",
  paddingTop: 4, // Space between the icon and text label
  },
  });
  
  export default HomePage;
