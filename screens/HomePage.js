import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Service from '../service';

const HomePage = () => {
  const [teamsAndMeetings, setTeamsAndMeetings] = useState([]);

  const fetchTeamsAndMeetings = async () => {
    try {
      const userId = await SecureStore.getItemAsync('userId');
      if (userId) {
        const data = await Service.getAllTeamsAndMeetings(userId);
        if (data) {
          // Transform the data into an array of teams, each with their meetings
          const teams = Object.keys(data).map((teamId) => {
            const { team, meetings } = data[teamId];
            return {
              ...team,
              meetings: meetings || [],
            };
          });
          setTeamsAndMeetings(teams);
        }
      }
    } catch (error) {
      console.error("Error fetching teams and meetings:", error);
    }
  };

  useEffect(() => {
    fetchTeamsAndMeetings();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {teamsAndMeetings.map((team, index) => (
        <View key={team._id || index} style={styles.teamContainer}>
          <Text style={styles.teamName}>{team.teamName}</Text>
          <View style={styles.meetingsContainer}>
            {team.meetings.map((meeting, meetingIndex) => (
              <Text key={meeting.id || meetingIndex} style={styles.meetingInfo}>
                {meeting.meetingName} at {meeting.meetingStartDateTime}
              </Text>
            ))}
            {team.meetings.length === 0 && <Text style={styles.meetingInfo}>No meetings found</Text>}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  teamContainer: {
    marginBottom: 20,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  meetingsContainer: {
    marginTop: 10,
  },
  meetingInfo: {
    fontSize: 16,
  },
});

export default HomePage;
