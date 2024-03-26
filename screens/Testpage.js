import React from "react";
import { View, Button, StyleSheet } from "react-native";

const TestPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Meeting Configuration"
        onPress={() => navigation.navigate("MeetingConfiguration")}
      />
      <Button
        title="Go to Create Team"
        onPress={() => navigation.navigate("CreateTeam")}
      />
      <Button
        title="Go to Common Timeslots"
        onPress={() => navigation.navigate("CommonSlots")}
      />
      <Button
        title="Go to Meeting Progress"
        onPress={() => navigation.navigate("MeetingProgressScreen")}
      />
      <Button
        title="Go to Meeting Success Page"
        onPress={() => navigation.navigate("MeetingSuccessScreen")}
      />
      <Button
        title="Go to Test Notif"
        onPress={() => navigation.navigate("NotifTest")}
      />
      <Button
        title="Go to Calendar"
        onPress={() => navigation.navigate("ScheduleScreen")}
      />
      <Button
        title="Go to Reschedule Meeting"
        onPress={() => navigation.navigate("RescheduleMeeting")}
      />
      <Button
        title="Go to Meeting List"
        onPress={() => navigation.navigate("MeetingList")}
      />
      <Button
        title="Go to HomePage"
        onPress={() => navigation.navigate("HomePage")}
      />
       <Button
        title="Go to Google Caledenar"
        onPress={() => navigation.navigate("GoogleCalendar")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TestPage;
