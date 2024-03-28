import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Service from '../service';
import { useUserIdContext } from '../UserIdContext'; // Make sure the path is correct

const PendingMeetings = () => {
  const navigation = useNavigation();
  const { userId } = useUserIdContext(); // Use userId from context
  const [votedMeetings, setVotedMeetings] = useState({});
  const [notVotedMeetings, setNotVotedMeetings] = useState({});

  useEffect(() => {
    console.log(`Using userId from context: ${userId}`); // Log the userId being used
    const fetchData = async () => {
      try {
        const votedData = await Service.getPendingUserVotedMeetings(userId);
        const notVotedData = await Service.getPendingUserNotVotedMeetings(userId);
        setVotedMeetings(votedData || {});
        setNotVotedMeetings(notVotedData || {});
      } catch (error) {
        console.error("Error fetching meetings data:", error);
      }
    };

    fetchData();
  }, []);

  const navigateToCommonSlots = (meetingId) => {
    navigation.navigate("CommonSlots", { meetingId });
  };


  const renderMeetings = (data, isNotVotedSection = false) => {
    if (!data || typeof data !== 'object') {
      console.log("Data is not an object:", data);
      return null;
    }

    return Object.entries(data).map(([teamString, meetingsArray]) => {
      if (!meetingsArray || meetingsArray.length === 0) {
        console.log(`No meetings for team: ${teamString}`);
        return null;
      }

      const teamName = teamString.match(/teamName=([^,]+)/)[1];
      console.log(`Rendering meetings for team: ${teamName}`);
      return (
        <View key={teamName} style={styles.teamContainer}>
          <Text style={styles.teamName}>{teamName}</Text>
          {meetingsArray.map((meeting, index) => (
            <View key={index} style={styles.meetingContainer}>
              <Text style={styles.meetingName}>{meeting.meetingName || "Unnamed Meeting"}</Text>
              {isNotVotedSection && (
                <TouchableOpacity
                  style={styles.voteButton}
                  onPress={() => navigateToCommonSlots(meeting.id)}
                >
                  <Text style={styles.voteButtonText}>Vote</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Pending Meetings - Voted</Text>
        {renderMeetings(votedMeetings)}
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Pending Meetings - Not Voted</Text>
        {renderMeetings(notVotedMeetings, true)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingHorizontal: '10%',
    paddingBottom: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    paddingVertical: 10,
  },
  teamContainer: {
    marginTop: 10,
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 5,
  },
  meetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  meetingName: {
    fontSize: 18,
    color: '#000',
  },
  voteButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  voteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PendingMeetings;
