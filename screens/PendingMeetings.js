import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import Service from '../service';

const PendingMeetingsPage = ({ navigation }) => {
  const [pendingVotedMeetings, setPendingVotedMeetings] = useState([]);
  const [pendingNotVotedMeetings, setPendingNotVotedMeetings] = useState([]);
  const [error, setError] = useState(null); // Added state to track errors
  const userId = '65faf4e4eaf97718d8d3d0ca'; // Replace with actual user ID source

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const votedResponse = await Service.getPendingUserVotedMeetings(userId);
        const notVotedResponse = await Service.getPendingUserNotVotedMeetings(userId);
        
        // Check if data is present and is an array before setting it
        if (Array.isArray(votedResponse.data)) {
          setPendingVotedMeetings(votedResponse.data);
        }
        if (Array.isArray(notVotedResponse.data)) {
          setPendingNotVotedMeetings(notVotedResponse.data);
        }
      } catch (error) {
        console.error('Error fetching meetings:', error);
        setError(error); // Setting the error state
      }
    };

    fetchMeetings();
  }, []);

  const renderMeetingCard = (meeting) => (
    <View key={meeting.id} style={styles.meetingCard}>
      <Text style={styles.meetingName}>{meeting.meetingName}</Text>
      <Text style={styles.meetingDetails}>
        Votes: {`${Object.keys(meeting.hasUserVoted).length}/${meeting.userCount}`}
      </Text>
      {/* Render additional buttons and actions as necessary */}
    </View>
  );

  if (error) {
    // Render an error message if there's an error
    return (
      <View style={styles.container}>
        <Text>Failed to load meetings. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Meetings I've Voted On</Text>
        {pendingVotedMeetings.map(renderMeetingCard)}
        <Text style={styles.sectionTitle}>Meetings Pending My Vote</Text>
        {pendingNotVotedMeetings.map(renderMeetingCard)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Define your styles here, reuse the styles from your HomePage or create new ones as needed.
  // ...
});

export default PendingMeetingsPage;
