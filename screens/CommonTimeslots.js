import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox, Card, Button, DefaultTheme, PaperProvider } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'black', // Set primary color to black
        background: 'white', // Set background color to white
        text: 'black', // Set text color to black
    },
};

const CommonTimeslots = () => {
    const [checkboxStates, setCheckboxStates] = React.useState([false, false]);
    const handleCheckboxPress = (index) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = !newCheckboxStates[index];
        setCheckboxStates(newCheckboxStates);
    };

    const [timeslots, setTimeslots] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/meeting/${meetingId}/getCommonAvailabilities`)
            .then(response => response.json())
            .then(data => {
                const fetchedTimeslots = Object.keys(data); // Assuming API returns an object with timeslots as keys
                setTimeslots(fetchedTimeslots);
                setCheckboxStates(new Array(fetchedTimeslots.length).fill(false)); // Initialize all checkboxes as unchecked
            })
            .catch(error => console.error('Error fetching timeslots:', error));
    }, [meetingId]);

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
                        />
                    </View>
                </Card>
            ))}

            {/* <Card style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.dateTime}>
                    <Text style={styles.dateTimeText}>18/01/24</Text>
                    <Text style={styles.dateTimeText}>2pm-4pm</Text>
                </View>
                <Checkbox
                    status={checkboxStates[1] ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxPress(1)}
                />
                </View>
            </Card> */}

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
