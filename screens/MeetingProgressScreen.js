import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Mock data - replace this with your actual data source
const members = [
  { id: "1", name: "Jack Smith", hasVoted: true },
  { id: "2", name: "Emily Brown", hasVoted: false },
  { id: "3", name: "John Doe", hasVoted: false },
  { id: "4", name: "Jane Smith", hasVoted: false },
  { id: "5", name: "Michael Johnson", hasVoted: false },
];

const MemberItem = ({ name, hasVoted, onPingPress }) => (
  <View style={styles.memberItem}>
    <Ionicons name="person-circle-outline" size={24} color="black" />
    <Text style={styles.memberName}>
      {name}
      {hasVoted && " (You)"}
    </Text>
    {!hasVoted && (
      <TouchableOpacity onPress={onPingPress} style={styles.pingButton}>
        <Text style={styles.pingButtonText}>Ping</Text>
      </TouchableOpacity>
    )}
  </View>
);

const MeetingProgressScreen = () => {
  const handlePingPress = (memberName) => {
    // Implement your ping functionality here
    console.log(`Ping ${memberName}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meeting Generation In Progress:</Text>

      <Text style={styles.subHeader}>Members Voted</Text>
      <FlatList
        data={members.filter((member) => member.hasVoted)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MemberItem
            name={item.name}
            hasVoted={item.hasVoted}
            onPingPress={() => handlePingPress(item.name)}
          />
        )}
      />

      <Text style={styles.subHeader}>Members Yet To Vote</Text>
      <FlatList
        data={members.filter((member) => !member.hasVoted)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MemberItem
            name={item.name}
            hasVoted={item.hasVoted}
            onPingPress={() => handlePingPress(item.name)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Adjust padding as needed
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  memberName: {
    marginLeft: 10,
    flex: 1,
  },
  pingButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 10,
  },
  pingButtonText: {
    color: "#ffffff",
  },
  // Add additional styles as necessary
});

export default MeetingProgressScreen;
