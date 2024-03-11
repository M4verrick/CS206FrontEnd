import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import Modal from 'react-native-modal'; // Correct import for react-native-modal
import { FlatList } from 'react-native';

// Define the teams array with default values
const teams = ["CS205", "CS202", "CS201"];

const MeetingConfigurationScreen = () => {
  const [selectedTeam, setSelectedTeam] = useState();
  const [meetingName, setMeetingName] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [preferredDates, setPreferredDates] = useState('');
  const [preferredTimings, setPreferredTimings] = useState('');
  const [isPickerModalVisible, setPickerModalVisible] = useState(false);


  // Function to handle the creation of a meeting
  const handleCreateMeeting = () => {
    // TODO: Logic to handle the creation of the meeting
    console.log('Create Meeting with the following configuration', {
      selectedTeam,
      meetingName,
      selectedDuration,
      selectedFrequency,
      preferredDates,
      preferredTimings,
    });
  };
  const renderTeamItem = ({ item }) => (
    <TouchableOpacity
      style={styles.teamItem}
      onPress={() => {
        setSelectedTeam(item);
        setPickerModalVisible(false);
      }}>
      <Text style={styles.teamItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Meeting Configuration</Text>

      <Text style={styles.label}>Team</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setPickerModalVisible(true)}
      >
        <Text style={styles.inputText}>{selectedTeam || 'Select Team'}</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isPickerModalVisible}
        onBackdropPress={() => setPickerModalVisible(false)}
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
    

      <Text style={styles.label}>Meeting Name</Text>
      <TextInput
        style={styles.input}
        value={meetingName}
        onChangeText={setMeetingName}
        placeholder="Enter Meeting Name"
        placeholderTextColor="#999"
      />


      <Text style={styles.label}>Duration of Meeting</Text>
      <View style={styles.buttonGroup}>
        {['1 hour', '2 hours', '4 hours', 'Custom'].map((duration) => (
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

      <Text style={styles.label}>Frequency</Text>
      <View style={styles.buttonGroup}>
        {['Once', 'Weekly', 'Monthly', 'Custom'].map((frequency) => (
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
      <TextInput
        style={styles.input}
        value={preferredDates}
        onChangeText={setPreferredDates}
        placeholder="Select Dates"
      />

      <Text style={styles.label}>Preferred Timings</Text>
      <TextInput
        style={styles.input}
        value={preferredTimings}
        onChangeText={setPreferredTimings}
        placeholder="Select Timing"
      />

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
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 22,
  },
  teamItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  teamItemText: {
    textAlign: 'center',
    fontSize: 18,
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    fontSize: 16,
    marginTop: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 5,
  },
  picker: {
    height: 50,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 5,
    backgroundColor: '#fff', // Default background
  },
  selectedButton: {
    backgroundColor: 'black', // Background for selected button
  },
  buttonText: {
    color: 'black', // Text color for unselected buttons
    textAlign: 'center',
  },
  selectedButtonText: {
    color: 'white', // Text color for selected buttons
  },
  placeholderText: {
    color: '#999',
  },
  createButton: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default MeetingConfigurationScreen;
