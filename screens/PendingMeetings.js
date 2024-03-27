import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const API_URL = "http://10.87.13.193:8080/api/v1/user/";

const PendingMeetings = () => {
  // Hardcoded for testing, replace with dynamic user ID later
  const userId = '65f2b647bf4e4e42bdbaeea8';
  const [isLoading, setIsLoading] = useState(true);
  const [votedMeetings, setVotedMeetings] = useState([]);
  const [notVotedMeetings, setNotVotedMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async (endpoint, setter) => {
      try {
        const response = await axios.get(`${API_URL}${userId}/${endpoint}`);
        setter(response.data); // Assuming the data structure matches the expected format
      } catch (error) {
        if (error.response) {
          // The server responded with a status code outside the 2xx range
          console.error('Backend error status:', error.response.status);
          console.error('Backend error data:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error request:', error.request);
        } else {
          // Something else caused the error
          console.error('Error message:', error.message);
        }
        Alert.alert("Error", `Could not fetch ${endpoint}. Please try again later.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings('getPendingUserVotedMeetings', setVotedMeetings);
    fetchMeetings('getPendingUserNotVotedMeetings', setNotVotedMeetings);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <Text style={styles.title}>Voted Meetings</Text>
          {votedMeetings.length > 0 ? (
            votedMeetings.map((meeting, index) => (
              <View key={index} style={styles.meetingCard}>
                <Text>{meeting.name} - Voted</Text>
              </View>
            ))
          ) : (
            <Text style={styles.infoText}>No voted meetings found</Text>
          )}

          <Text style={styles.title}>Meetings To Vote On</Text>
          {notVotedMeetings.length > 0 ? (
            notVotedMeetings.map((meeting, index) => (
              <View key={index} style={styles.meetingCard}>
                <Text>{meeting.name} - To Vote</Text>
              </View>
            ))
          ) : (
            <Text style={styles.infoText}>No meetings to vote on found</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2', // Use a light grey background
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  meetingCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginVertical: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  // You can add more styles as needed for your layout and design
});

export default PendingMeetings;
