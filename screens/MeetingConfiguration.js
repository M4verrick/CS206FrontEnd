import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  View,
} from "react-native";
import Modal from "react-native-modal";
import MeetingService from "../meetingService";
import DateTimePicker from "@react-native-community/datetimepicker";
import Service from "../service";
import { useUserTeamIdContext } from "../UserTeamIdContext";
const generateTimeSlots = (startHour, endHour) => {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    const start = hour < 10 ? `0${hour}:00` : `${hour}:00`;
    const end = hour + 1 < 10 ? `0${hour + 1}:00` : `${hour + 1}:00`;
    slots.push(`${start} - ${end}`);
  }
  return slots;
};

const MeetingConfigurationScreen = () => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("Once");
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimings, setSelectedTimings] = useState([]);
  const [isTeamPickerModalVisible, setTeamPickerModalVisible] = useState(false);
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [teams, setTeamNames] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState({
    start: false,
    end: false,
  });
  const [timeSlots] = useState(generateTimeSlots(8, 24)); // 24-hour format for 12 AM
  const { userTeamIds } = useUserTeamIdContext();
  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker({ ...showDatePicker, start: false });
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowDatePicker({ ...showDatePicker, end: false });
    setEndDate(currentDate);
  };

  const getDurationInSeconds = (duration) => {
    switch (duration) {
      case "1 hour":
        return 3600;
      case "2 hours":
        return 7200;
      case "4 hours":
        return 14400;
      case "Custom":
        return parseInt(customDuration) * 3600; // Custom duration in hours to seconds
      default:
        return 3600; // Default to 1 hour
    }
  };
  useEffect(() => {
    const fetchTeamNames = async () => {
      try {
        // Fetching both team names and their IDs
        const teamsDataPromises = userTeamIds.map(async (teamId) => {
          const teamInfo = await Service.getTeamById(teamId);
          return {
            teamName: teamInfo.teamName, // Assuming the response has a teamName field
            teamId: teamId, // Or teamInfo.teamId if the ID is part of the response
          };
        });

        const resolvedTeamsData = await Promise.all(teamsDataPromises);
        setTeamNames(resolvedTeamsData); // Stores objects with teamName and teamId
      } catch (error) {
        console.error("Failed to fetch team names", error);
      }
    };

    if (userTeamIds.length > 0) {
      fetchTeamNames();
    }
  }, [userTeamIds]);

  // createMeeting
  const handleCreateMeeting = async () => {
    const durationInSeconds = getDurationInSeconds(selectedDuration);
    const teamId = selectedTeamId;
    const frequency = selectedFrequency;
    const startTime =
      selectedTimings.length > 0 ? selectedTimings[0].split(" - ")[0] : "00:00";
    const endTime =
      selectedTimings.length > 0 ? selectedTimings[0].split(" - ")[1] : "00:00";
    const firstDateTimeLimit = startDate
      ? `${startDate.toISOString().split("T")[0]}T${startTime}:00`
      : null;
    const lastDateTimeLimit = endDate
      ? `${endDate.toISOString().split("T")[0]}T${endTime}:00`
      : null;

    try {
      const response = MeetingService.createMeeting(
        teamId,
        meetingName,
        firstDateTimeLimit,
        lastDateTimeLimit,
        durationInSeconds,
        frequency
      );
      if (response) {
        console.log("Meeting successfully created:", response.data);
        navigation.navigate("CommonTimeSlots", {
          meetingId: response.data.meetingId,
        });
      } else {
        console.error("Failed to create meeting:", response.data);
      }
    } catch (error) {
      console.log("Error creating meeting", error);
    }
  };

  const renderTeamItem = ({ item }) => (
    <TouchableOpacity
      style={styles.teamItem}
      onPress={() => {
        setSelectedTeam(item.teamName); // Update to show the team name
        setSelectedTeamId(item.teamId); // Store the selected team's ID
        setTeamPickerModalVisible(false);
      }}
    >
      <Text style={styles.teamItemText}>{item.teamName}</Text>
    </TouchableOpacity>
  );

  const handleSelectDate = (day) => {
    setSelectedDates((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  const handleSelectTime = (time) => {
    setSelectedTimings((prev) => {
      if (prev.includes(time)) {
        return prev.filter((t) => t !== time);
      } else {
        return [...prev, time];
      }
    });
  };

  const renderTimeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => handleSelectTime(item)}
    >
      <Text style={styles.checkboxLabel}>{item}</Text>
      <Text style={styles.checkbox}>
        {selectedTimings.includes(item) ? "✓" : ""}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Meeting Configuration</Text>

      {/* team picker */}
      <Text style={styles.label}>Team</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setTeamPickerModalVisible(true)}
      >
        <Text style={styles.inputText}>{selectedTeam || "Select Team"}</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isTeamPickerModalVisible}
        onBackdropPress={() => setTeamPickerModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <FlatList
            data={teams}
            renderItem={renderTeamItem}
            keyExtractor={(item) => item}
          />
        </View>
      </Modal>

      {/* meeting name */}
      <Text style={styles.label}>Meeting Name</Text>
      <TextInput
        style={styles.input}
        value={meetingName}
        onChangeText={setMeetingName}
        placeholder="Enter Meeting Name"
        placeholderTextColor="#999"
      />

      {/* meeting duration */}
      <Text style={styles.label}>Duration of Meeting</Text>
      <View style={styles.buttonGroup}>
        {["1 hour", "2 hours", "4 hours", "Custom"].map((duration) => (
          <TouchableOpacity
            key={duration}
            style={[
              styles.button,
              selectedDuration === duration && styles.selectedButton,
            ]}
            onPress={() => setSelectedDuration(duration)}
          >
            <Text style={styles.buttonText}>{duration}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom Duration Input */}
      {selectedDuration === "Custom" && (
        <TextInput
          style={styles.input}
          value={customDuration}
          onChangeText={setCustomDuration}
          placeholder="Enter duration in hours"
          keyboardType="numeric"
        />
      )}

      {/* meeting frequency */}
      <Text style={styles.label}>Frequency</Text>
      <View style={styles.buttonGroup}>
        {["Once", "Weekly", "Monthly", "Custom"].map((frequency) => (
          <TouchableOpacity
            key={frequency}
            style={[
              styles.button,
              selectedFrequency === frequency && styles.selectedButton,
            ]}
            onPress={() => setSelectedFrequency(frequency)}
          >
            <Text style={styles.buttonText}>{frequency}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Preferred Set of Dates</Text>
      {/* Start Date Picker */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowDatePicker({ ...showDatePicker, start: true })}
      >
        <Text>Select Start Date</Text>
      </TouchableOpacity>
      {showDatePicker.start && (
        <DateTimePicker
          value={startDate || new Date()}
          mode={"date"}
          display="default"
          onChange={onStartDateChange}
        />
      )}

      {/* End Date Picker */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowDatePicker({ ...showDatePicker, end: true })}
      >
        <Text>Select End Date</Text>
      </TouchableOpacity>
      {showDatePicker.end && (
        <DateTimePicker
          value={endDate || new Date()}
          mode={"date"}
          display="default"
          onChange={onEndDateChange}
        />
      )}

      {/* timings */}
      <Text style={styles.label}>Preferred Timings</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setTimeModalVisible(true)}
      >
        <Text style={styles.inputText}>
          {selectedTimings.length > 0
            ? selectedTimings.join(", ")
            : "Select Timing"}
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={isTimeModalVisible}
        onBackdropPress={() => setTimeModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <FlatList
            data={timeSlots}
            renderItem={renderTimeItem}
            keyExtractor={(item) => item}
          />
        </View>
      </Modal>

      {/* create meeting */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateMeeting}
      >
        <Text style={styles.createButtonText}>Create Meeting</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 22,
  },
  teamItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  teamItemText: {
    textAlign: "center",
    fontSize: 18,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  checkboxLabel: {
    fontSize: 18,
  },
  checkbox: {
    fontSize: 18,
    color: "black",
  },
  inputText: {
    fontSize: 16,
    color: "#333",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    fontSize: 16,
    marginTop: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  selectedButton: {
    backgroundColor: "#add8e6", // Light blue color
    borderColor: "#77b3d4", // Optional: slightly darker shade for border if needed
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  createButton: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default MeetingConfigurationScreen;
