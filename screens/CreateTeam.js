import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const NewTeamScreen = () => {
  const [teamName, setTeamName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleCreateTeam = () => {
    // TODO: Logic for creating a new team with the provided details
    console.log("Creating new team:", teamName, startDate, endDate);
  };
  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === "ios");
    setStartDate(currentDate); // Make sure currentDate is a Date object
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === "ios");
    setEndDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>New Team</Text>

      <Text style={styles.label}>Team Name</Text>
      <TextInput
        style={styles.input}
        value={teamName}
        onChangeText={setTeamName}
        placeholder="Fill In Here"
      />

      <Text style={styles.label}>Group Duration</Text>
      <Text style={styles.smallText}>
        * team will be auto-deleted after the given time period
      </Text>

      <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.datePickerText}>
          Start Date:{" "}
          {startDate instanceof Date ? startDate.toDateString() : "Not a date"}
        </Text>
      </TouchableOpacity>

      {showStartDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(Platform.OS === 'ios');
            setStartDate(selectedDate || startDate);
          }}
        />
      )}
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
        <Text style={styles.datePickerText}>
          End Date: {endDate.toDateString()}
        </Text>
      </TouchableOpacity>

      {showEndDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={endDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndDatePicker(Platform.OS === 'ios');
            setEndDate(selectedDate || endDate);
          }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleCreateTeam}>
        <Text style={styles.buttonText}>Create New Team</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  smallText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default NewTeamScreen;
