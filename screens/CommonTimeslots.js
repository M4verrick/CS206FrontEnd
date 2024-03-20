import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox, Card, Button, DefaultTheme, PaperProvider } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'black',
        background: 'white',
        text: 'black',
    },
};

const CommonTimeslots = ({ meetingId, userId }) => {
    const [checkboxStates, setCheckboxStates] = useState([]);
    const [timeslots, setTimeslots] = useState([]);
    const [hasUserVoted, setHasUserVoted] = useState(false); // New state to track user's vote

    // GET getMeeting
    const fetchMeeting = async () => {
        try {
            const response = await fetch(`${API_URL}/meeting/${meetingId}/getMeeting`);
            const data = await response.json();
            console.log("Fetched Data:", data); // Debugging line to see fetched data structure
            const fetchedTimeslots = data.meetingAvailabilities ? Object.keys(data.meetingAvailabilities) : [];
            console.log("Fetched Timeslots:", fetchedTimeslots); // Debugging line to see fetched timeslots

            // Updating states sequentially to ensure they are based on the correct data
            setTimeslots(fetchedTimeslots);
            setCheckboxStates(fetchedTimeslots.map(() => false)); // This ensures checkbox states are reset based on the fetched timeslots
            setHasUserVoted(data.hasUserVoted[meetingId]); // Adjust this based on actual logic to determine if user has voted
        } catch (error) {
            console.error('Error fetching meeting details:', error);
        }
    };
    useEffect(() => {
        fetchMeeting();
    }, []);

    // GET getCommonAvailabilities
    const fetchCommonAvailabilities = async () => {
        try {
          const response = await fetch(`${API_URL}/meeting/${meetingId}/getCommonAvailabilities`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          // Now you have your common availabilities in 'data', which you can then set in state
          setTimeslots(data); // Assuming the data is directly the array/map of timeslots
        } catch (error) {
          console.error('Error fetching common availabilities:', error);
        }
      };
    useEffect(() => {
        fetchCommonAvailabilities(); // Add this to fetch common availabilities on component mount
        fetchMeeting();
    }, []);

    const handleCheckboxPress = async (index) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = !newCheckboxStates[index];
        setCheckboxStates(newCheckboxStates);

        const availabilityMap = timeslots.reduce((map, timeslot, idx) => {
            map[timeslot] = newCheckboxStates[idx];
            return map;
          }, {});

        // PUT addVote
        try {
            // Assuming you pass the availability map in the body, adjust as per your API
            const response = await fetch(`${API_URL}/meeting/${meetingId}/${userId}/addVote`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ availabilityMap }),
            });
            if (response.ok) {
                // Handle successful vote
                console.log('Vote successfully recorded');
                setHasUserVoted(true); // Update the vote status
            } else {
                console.error('Failed to record vote');
            }
        } catch (error) {
            console.error('Error submitting vote:', error);
        }
    };

    return (
        <PaperProvider theme={theme}>
        <View style={styles.container}>
            <Text style={styles.title}>Common Timeslots</Text>

            <Text style={styles.subtitle}>
                These are the common available timeslots for the group, please uncheck the timings that you are unable to make it for.
            </Text>

            {timeslots.map((timeslot, index) => (
                <Card key={timeslot} style={styles.card}>
                    <View style={styles.row}>
                        <View style={styles.dateTime}>
                            <Text style={styles.dateTimeText}>{timeslot.replace('_', ' to ')}</Text>
                        </View>
                        <Checkbox
                            status={checkboxStates[index] ? 'checked' : 'unchecked'}
                            onPress={() => handleCheckboxPress(index)}
                            disabled={Object.values(hasUserVoted).some(vote => vote)} // Disable based on vote status
                        />
                    </View>
                </Card>
            ))}

            <Button mode="outlined" style={styles.button}>View my Calendar</Button>

            <Button mode="outlined" style={styles.button}>Continue</Button>
        </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
    },
    card: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#E7E7E7',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateTime: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
    },
    dateTimeText: {
        textAlign: 'center',
    },
    button: {
        marginVertical: 5,
    },
});

export default CommonTimeslots;
