import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Checkbox, Card, Button, DefaultTheme, PaperProvider } from 'react-native-paper';
import axios from 'axios';

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
    const [hasUserVoted, setHasUserVoted] = useState(false);

    // GET getMeeting
    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                const meetingsData = await Promise.all(
                    meetingIds.map(id =>
                        axios.get(`${API_URL}/meeting/${id}/getMeeting`, {
                            withCredentials: true,
                        })
                    )
                );
                const allTimeslots = meetingsData.flatMap(response => response.data.meetingAvailabilities ? Object.keys(response.data.meetingAvailabilities) : []);
                // Assuming each meeting's data contains a `meetingAvailabilities` object with timeslots as keys
                setTimeslots(allTimeslots);
                setCheckboxStates(new Array(allTimeslots.length).fill(false));
                // Assuming `hasUserVoted` is a boolean for simplicity, adjust based on your actual data structure
                setHasUserVoted(meetingsData.some(response => response.data.hasUserVoted));
            } catch (error) {
                console.error("Error fetching meeting:", error);
                Alert.alert("Error", "Could not fetch meeting.");
            }
        };
        fetchMeeting();
    }, [meetingIds]);

    // GET getCommonAvailabilities
    useEffect(() => {
        const fetchCommonAvailabilities = async () => {
            try {
                const commonData = await Promise.all(
                    meetingIds.map(id =>
                        axios.get(`${API_URL}/meeting/${id}/getCommonAvailabilities`, {
                            withCredentials: true,
                        })
                    )
                );
                const commonTimeslots = commonData.flatMap(response => response.data.timeslots ? response.data.timeslots : []);
                // Assuming the API returns a 'timeslots' array
                setTimeslots(commonTimeslots);
                setCheckboxStates(new Array(commonTimeslots.length).fill(false));
            } catch (error) {
                console.error("Error fetching common availabilities:", error);
                Alert.alert("Error", "Could not fetch common availabilities.");
            }
        };
        if (meetingIds.length > 0) {
            fetchCommonAvailabilities();
        }
    }, [meetingIds]);

      const handleCheckboxPress = async (index) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = !newCheckboxStates[index];
        setCheckboxStates(newCheckboxStates);

        const availabilityMap = timeslots.reduce((map, timeslot, idx) => {
            map[timeslot] = newCheckboxStates[idx];
            return map;
        }, {});

        try {
            const response = await axios.put(`${API_URL}/meeting/${meetingIds[0]}/${userId}/addVote`, // Assuming the first meeting ID for example
                { availabilityMap },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );
            if (response.status === 200) {
                console.log('Vote successfully recorded');
                setHasUserVoted(true);
            } else {
                console.error('Failed to record vote');
            }
        } catch (error) {
            console.error('Error submitting vote:', error);
        }
    };

    // Function to format date and time
    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('en-UK', {
            dateStyle: 'full', 
            timeStyle: 'short'
        }).format(date);
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
                                {/* Display formatted date and time */}
                                <Text style={styles.dateTimeText}>{formatDateTime(timeslot)}</Text>
                            </View>
                            <Checkbox
                                status={checkboxStates[index] ? 'checked' : 'unchecked'}
                                onPress={() => handleCheckboxPress(index)}
                                disabled={hasUserVoted}
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
