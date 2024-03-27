import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Agenda } from "react-native-calendars";
import { useMeetingIdContext } from "../MeetingIdContext"; // Ensure the correct path is used
import MeetingService from "../meetingService"; // Import your getMeeting function

const ScheduleScreen = ({ navigation }) => {
  const [items, setItems] = useState({});
  const { meetingIds } = useMeetingIdContext();

  useEffect(() => {
    const fetchMeetings = async () => {
      const fetchedMeetings = {};
      for (let id of meetingIds) {
        try {
          const meeting = await MeetingService.getMeeting(id);
          // Before using split, check if meeting.meetingStartDateTime is not null or undefined
          const startDate = meeting.meetingStartDateTime
            ? meeting.meetingStartDateTime.split("T")[0]
            : "No Start Date";

          if (!fetchedMeetings[startDate]) {
            fetchedMeetings[startDate] = [];
          }

          fetchedMeetings[startDate].push({
            name: meeting.meetingName,
            start: meeting.meetingStartDateTime,
            end: meeting.meetingEndDateTime,
            duration: meeting.meetingDurationInSeconds,
            // Include any other properties that might be needed
          });
        } catch (error) {
          console.error("Error fetching meeting:", error);
        }
      }
      setItems(fetchedMeetings);
    };

    fetchMeetings();
  }, [meetingIds]);
  console.log(items);
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text>{item.name}</Text>
        <Text>{`Start: ${new Date(item.start).toLocaleTimeString()}`}</Text>
        <Text>{`End: ${new Date(item.end).toLocaleTimeString()}`}</Text>
      </View>
    );
  };

  return (
    <Agenda
      items={items}
      renderItem={renderItem}
      // Add other props and customizations as needed
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 20,
    marginRight: 10,
    marginTop: 17,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Other styles...
});

export default ScheduleScreen;
