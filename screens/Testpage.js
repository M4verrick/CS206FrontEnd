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
        onPress={() => navigation.navigate("CommonTimeslots")}
      />
      <Button
        title="Go to Reschedule Meeting"
        onPress={() => navigation.navigate("RescheduleMeeting")}
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
