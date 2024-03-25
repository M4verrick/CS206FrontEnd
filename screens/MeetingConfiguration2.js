import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import Service from "../service";
import { useUserTeamIdContext } from "../UserTeamIdContext";

const MeetingConfigurationScreen2 = () => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("Once");
  const [isTeamPickerModalVisible, setTeamPickerModalVisible] = useState(false);
  const [teams, setTeamNames] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState({
    start: false,
    end: false,
  });
  const { userTeamIds } = useUserTeamIdContext();
  const handleCreateMeeting = async () => {
    const durationInSeconds = getDurationInSeconds(selectedDuration);
    const firstDateTimeLimit = startDate ? startDate.toISOString() : null;
    const lastDateTimeLimit = endDate ? endDate.toISOString() : null;
    const teamId = selectedTeamId;
    console.log(firstDateTimeLimit);
    console.log(lastDateTimeLimit);
    const frequency = selectedFrequency; // Directly use the state variable
    try {
      const response = MeetingService.createMeeting(
        teamId,
        meetingName,
        firstDateTimeLimit,
        lastDateTimeLimit,
        durationInSeconds,
        frequency
      );
      if (response.status === 200 || response.status === 201) {
        console.log("Meeting successfully created:", response.data);
        navigation.navigate("CommonTimeslots", {
          meetingId: response.data.meetingId,
        });
      } else {
        console.error("Failed to create meeting:", response.data);
      }
    } catch (error) {
      console.log("Error creating meeting", error);
    }
  };

  useEffect(() => {
    const fetchTeamNames = async () => {
      try {
        const teamsDataPromises = userTeamIds.map(async (teamId) => {
          const teamInfo = await Service.getTeamById(teamId);
          return {
            teamName: teamInfo.teamName,
            teamId: teamId,
          };
        });

        const resolvedTeamsData = await Promise.all(teamsDataPromises);
        setTeamNames(resolvedTeamsData);
      } catch (error) {
        console.error("Failed to fetch team names", error);
      }
    };

    if (userTeamIds.length > 0) {
      fetchTeamNames();
    }
  }, [userTeamIds]);

  const onDateChange = (event, selectedDate, type) => {
    setShowDatePicker({ ...showDatePicker, [type]: false });
    if (type === "start") {
      setStartDate(selectedDate || startDate);
    } else if (type === "end") {
      setEndDate(selectedDate || endDate);
    }
  };

  const formatDateTime = (date) => {
    return date ? date.toISOString().split(".")[0].slice(0, -3) : "";
  };

  const renderTeamItem = ({ item }) => (
    <TouchableOpacity
      style={styles.teamItem}
      onPress={() => {
        setSelectedTeam(item.teamName);
        setSelectedTeamId(item.teamId);
        setTeamPickerModalVisible(false);
      }}
    >
      <Text style={styles.teamItemText}>{item.teamName}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Meeting Configuration</Text>

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
      >
        <View style={styles.modalContent}>
          <FlatList
            data={teams}
            renderItem={renderTeamItem}
            keyExtractor={(item) => item.teamId}
          />
        </View>
      </Modal>

      <Text style={styles.label}>Meeting Name</Text>
      <TextInput
        style={styles.input}
        value={meetingName}
        onChangeText={setMeetingName}
        placeholder="Enter Meeting Name"
      />

      <Text style={styles.label}>Duration of Meeting</Text>
      {/* Add UI for meeting duration selection */}

      <Text style={styles.label}>Frequency</Text>
      {/* Add UI for frequency selection */}
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

      <Text style={styles.label}>Start Date and Time</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowDatePicker({ ...showDatePicker, start: true })}
      >
        <Text>{formatDateTime(startDate)}</Text>
      </TouchableOpacity>
      {showDatePicker.start && (
        <DateTimePicker
          value={startDate}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) =>
            onDateChange(event, selectedDate, "start")
          }
        />
      )}

      <Text style={styles.label}>End Date and Time</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowDatePicker({ ...showDatePicker, end: true })}
      >
        <Text>{formatDateTime(endDate)}</Text>
      </TouchableOpacity>
      {showDatePicker.end && (
        <DateTimePicker
          value={endDate}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) =>
            onDateChange(event, selectedDate, "end")
          }
        />
      )}

      {/* Add UI for creating meeting */}
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
  container: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, marginTop: 20, marginBottom: 10 },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  teamItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  teamItemText: { textAlign: "center", fontSize: 18 },
  // Define additional styles as needed
});

export default MeetingConfigurationScreen2;
