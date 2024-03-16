import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, FlatList, View } from 'react-native';
import Modal from 'react-native-modal';

const teams = ["CS205", "CS202", "CS201"];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['8-12', '12-16', '16-20', '20-24'];

const MeetingConfigurationScreen = () => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [meetingName, setMeetingName] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimings, setSelectedTimings] = useState([]);
  const [isTeamPickerModalVisible, setTeamPickerModalVisible] = useState(false);
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);

  const handleCreateMeeting = () => {
    console.log('Create Meeting with the following configuration', {
      selectedTeam,
      meetingName,
      selectedDuration,
      selectedFrequency,
      selectedDates,
      selectedTimings,
    });
  };

  const renderTeamItem = ({ item }) => (
    <TouchableOpacity
      style={styles.teamItem}
      onPress={() => {
        setSelectedTeam(item);
        setTeamPickerModalVisible(false);
      }}>
      <Text style={styles.teamItemText}>{item}</Text>
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

  const renderDateItem = ({ item }) => (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => handleSelectDate(item)}>
      <Text style={styles.checkboxLabel}>{item}</Text>
      <Text style={styles.checkbox}>{selectedDates.includes(item) ? '✓' : ''}</Text>
    </TouchableOpacity>
  );

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
      onPress={() => handleSelectTime(item)}>
      <Text style={styles.checkboxLabel}>{item}</Text>
      <Text style={styles.checkbox}>{selectedTimings.includes(item) ? '✓' : ''}</Text>
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
        <Text style={styles.inputText}>{selectedTeam || 'Select Team'}</Text>
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
      <TouchableOpacity
        style={styles.input}
        onPress={() => setDateModalVisible(true)}
      >
        <Text style={styles.inputText}>
          {selectedDates.length > 0 ? selectedDates.join(', ') : 'Select Dates'}
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={isDateModalVisible}
        onBackdropPress={() => setDateModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <FlatList
            data={days}
            renderItem={renderDateItem}
            keyExtractor={(item) => item}
          />
        </View>
      </Modal>

      <Text style={styles.label}>Preferred Timings</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setTimeModalVisible(true)}
      >
        <Text style={styles.inputText}>
          {selectedTimings.length > 0 ? selectedTimings.join(', ') : 'Select Timing'}
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  checkboxLabel: {
    fontSize: 18,
  },
  checkbox: {
    fontSize: 18,
    color: 'black',
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
    backgroundColor: '#fff',
  },
  selectedButton: {
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
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
