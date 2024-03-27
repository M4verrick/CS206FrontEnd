import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Agenda } from "react-native-calendars";
// import { useMeetingIdContext } from "../MeetingIdContext"; // Ensure the correct path is used
// import MeetingService from "../meetingService"; // Import your getMeeting function
import Service from "../service";
import { useUserIdContext } from "../UserIdContext";

const UserEvents = ({ navigation, route }) => {
  const { meetingId } = route.params;
  const { userId } = useUserIdContext();
  const [items, setItems] = useState({});
  // const { meetingIds } = useMeetingIdContext();

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = {};
      try {
        const userEvents = await Service.getUserEvents(userId, meetingId);
        console.log(userEvents);
        for (let userEvent of userEvents) {
          const startDate = userEvent.eventStartDateTime
            ? userEvent.eventStartDateTime.split("T")[0]
            : "No Start Date";

          if (!fetchedEvents[startDate]) {
            fetchedEvents[startDate] = [];
          }
          console.log("USER EVENT: " + userEvent.eventName);
          console.log("USER EVENT: " + userEvent.eventStartDateTime);
          console.log("USER EVENT: " + userEvent.eventEndDateTime);

          fetchedEvents[startDate].push({
            name: userEvent.eventName,
            start: userEvent.eventStartDateTime,
            end: userEvent.eventEndDateTime,
            // duration: meeting.meetingDurationInSeconds,
            // Include any other properties that might be needed
          });
          console.log(fetchedEvents[startDate]);
        }
        // Before using split, check if meeting.meetingStartDateTime is not null or undefined
      } catch (error) {
        console.error("Error fetching meeting:", error);
      }

      setItems(fetchedEvents);
    };

    fetchEvents(userId, meetingId);
  }, []);
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

export default UserEvents;
