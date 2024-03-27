import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, Alert } from "react-native";
import {
  Checkbox,
  Card,
  Button,
  DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { useUserIdContext } from "../UserIdContext";
import axios from "axios";
import MeetingService from "../meetingService";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "black",
    background: "white",
    text: "black",
  },
};

const CommonTimeslots = ({ navigation, route }) => {
  const { meetingId } = route.params;
  const { userId } = useUserIdContext();
  const [checkedTimeslots, setCheckedTimeslots] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const finalMap = {};

  useEffect(() => {
    console.log("USERID IN COMMONTIMESLOTS " + userId);
    console.log(meetingId);
    const fetchMeeting = async () => {
      try {
        const commonTimeslots = await MeetingService.getCommonAvailabilities(
          meetingId
        );
        // const meetingData = await axios.get(`${API_URL}/meeting/${meetingId}/getCommonAvailabilities`);
        // const commonTimeslots = meetingData.data;
        const entries = Object.entries(commonTimeslots);
        console.log(entries);
        setTimeslots(entries);
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Could not fetch meeting.");
      }
    };
    fetchMeeting();
  }, []);

  const formatDateTimeRange = (dateTimeRangeString) => {
    // Split the string by underscore to get start and end date-time
    const [startDateTimeString, endDateTimeString] =
      dateTimeRangeString.split("_");

    // Parse start and end date-time strings into Date objects
    const startDate = new Date(startDateTimeString);
    const endDate = new Date(endDateTimeString);

    // Format start and end date-time without "at"
    const formattedStartDateTime =
      formatDate(startDate) + " " + formatTime(startDate);
    const formattedEndDateTime =
      formatDate(endDate) + " " + formatTime(endDate);

    // Construct the formatted date-time range string
    return `${formattedStartDateTime} to\n${formattedEndDateTime}`;
  };

  const formatDate = (date) => {
    return date.toLocaleString("en-UK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleString("en-UK", {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Display hours in 12-hour format with "am" or "pm"
    });
  };

  const handleCheckboxClick = (timeslot) => {
    const isChecked = checkedTimeslots.includes(timeslot);
    if (isChecked) {
      setCheckedTimeslots(checkedTimeslots.filter((slot) => slot !== timeslot));
    } else {
      setCheckedTimeslots([...checkedTimeslots, timeslot]);
    }
  };

  const handleContinueClick = () => {
    // Increment values for checked timeslots
    const updatedTimeslots = timeslots.map(([timeslot, value]) => [
      timeslot,
      checkedTimeslots.includes(timeslot) ? value : value + 1,
    ]);
    setTimeslots(updatedTimeslots);
    console.log(updatedTimeslots);

    updatedTimeslots.forEach((slot) => {
      finalMap[slot[0]] = slot[1];
    });

    handleContinue(finalMap);
  };

  const handleContinue = async (finalMap) => {
    console.log(finalMap);
    MeetingService.addVote(meetingId, userId, finalMap)
      // axios.put(`${API_URL}/meeting/${meetingId}/${userId}/addVote`, finalMap)
      .then((response) => {
        console.log("POST request successful:", response.data);
        Alert.alert("Successfully Voted");

        if (response.data == "User Voted Successfully") {
          setTimeout(() => {
            navigation.navigate("MeetingProgressScreen", {
              meetingId: meetingId,
            });
          }, 2000);
        } else {
          navigation.navigate("MeetingSuccessScreen", {
            meetingId: meetingId,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleUserEventsClick = () => {
    navigation.navigate("UserEvents", {
      meetingId: meetingId,
    });
  };

  return (
    <PaperProvider theme={theme}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Common Timeslots</Text>
        <Text style={styles.subtitle}>
          These are the common available timeslots for the group, please uncheck
          the timings that you are unable to make it for.
        </Text>

        {timeslots.map(([timeslot, value]) => (
          <Card key={timeslot} style={styles.card}>
            <View style={styles.row}>
              <View style={styles.dateTime}>
                <Text style={styles.dateTimeText}>
                  {formatDateTimeRange(timeslot)}
                </Text>
              </View>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={
                    checkedTimeslots.includes(timeslot)
                      ? "unchecked"
                      : "checked"
                  }
                  onPress={() => handleCheckboxClick(timeslot)}
                  color="black"
                  size={30}
                />
              </View>
            </View>
          </Card>
        ))}

        <Button
          mode="outlined"
          style={styles.button}
          onPress={handleUserEventsClick}
        >
          My Calendar Within Meeting Timeframe
        </Button>

        <Button
          mode="outlined"
          style={styles.button}
          onPress={handleContinueClick}
        >
          Continue
        </Button>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    overflow: "auto",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#E7E7E7",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateTime: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  dateTimeText: {
    textAlign: "left",
  },
  checkboxContainer: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    // width: 30,
    // height: 30
  },
  button: {
    marginVertical: 5,
  },
  bottomSpace: {
    height: 80, // Adjust this value to leave desired space
  },
});

export default CommonTimeslots;
