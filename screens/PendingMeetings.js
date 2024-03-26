import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Service from '../service'; // Assuming your API calls are defined here
import { useUserIdContext } from '../UserIdContext'; // Importing your custom hook

const PendingMeetings = () => {
  const { userIds } = useUserIdContext(); // Destructuring to get userIds array
  const [votedMeetings, setVotedMeetings] = useState([]);
  const [notVotedMeetings, setNotVotedMeetings] = useState([]);

  useEffect(() => {
    // Since userIds is an array, we take the first element as the current user's ID
    const currentUserId = userIds[0]; // Assuming the first element is the current userId

    const fetchMeetings = async () => {
      try {
        if (currentUserId) { // Ensure there's a currentUserId before making API calls
          const voted = await Service.getPendingUserVotedMeetings(currentUserId);
          const notVoted = await Service.getPendingUserNotVotedMeetings(currentUserId);
          setVotedMeetings(voted); // Assuming the API returns an array of meetings
          setNotVotedMeetings(notVoted); // Adjust according to your actual API response structure
        }
      } catch (error) {
        console.error('Failed to fetch meetings:', error);
      }
    };

    fetchMeetings();
  }, [userIds]); // Dependency array includes userIds to re-run effect if it changes

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Voted Meetings</Text>
      <FlatList
        data={votedMeetings}
        keyExtractor={(item, index) => index.toString()} // Using index as a key for simplicity
        renderItem={({ item }) => <Text>{item.name}</Text>} // Adjust based on your meeting object structure
      />

      <Text style={styles.header}>Meetings To Vote On</Text>
      <FlatList
        data={notVotedMeetings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default PendingMeetings;
