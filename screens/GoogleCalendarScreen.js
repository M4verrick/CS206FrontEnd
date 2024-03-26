import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import * as Linking from 'expo-linking'; // Import from expo-linking
import Service from '../service';
import { useUserIdContext } from '../UserIdContext';

const GoogleCalendarScreen = ({ navigation }) => {
    const { userId } = useUserIdContext();
    // const API_URL = "http://10.124.137.18:8080/";

    const handleConnectGoogleCalendarButtonClick = async () => {
        // try {
        //   // Make a request to your backend API to connect to Google Calendar
        //   const response = await axios.get(API_URL + `Google/${userId}/startOAuth`);
        //   const link = response.data;
    
        //   // Handle the response as needed
        //   console.log(link);
        //   alert("Opening Google Authentication")
        //   Linking.openURL(link);
        // } catch (error) {
        //   console.error('Error:', error);
        // }

        try {
            Service.connectGoogleCalendar(userId).then((link) => {
                console.log(link);
                alert("Opening Google Authentication")
                Linking.openURL(link);
            })
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.label}>Google Calendar Connection Required</Text>
        <Text style={styles.label}>If you are using apple calendar, please connect it to your google calendar for usage</Text>
          <Button
            title="Connect to Google Calendar"
            onPress={handleConnectGoogleCalendarButtonClick}
            style={styles.button} // Apply the button style here
          />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
      },
      button: {
        backgroundColor: 'blue', // Example background color
        color: 'white', // Example text color
        paddingHorizontal: 20, // Example padding
        paddingVertical: 10,
        borderRadius: 5, // Example border radius
      },
      label: {
        fontWeight: 'bold',
      },
    });
