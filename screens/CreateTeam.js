import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

const NewTeamScreen = () => {
  const [teamName, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [teamEmails, setTeamEmails] = useState([]);

  const handleAddEmail = () => {
    if (email && !teamEmails.includes(email)) {
      setTeamEmails([...teamEmails, email]);
      setEmail(""); // Clear input field after adding email
    }
  };

  const handleCreateTeam = () => {
    console.log("Creating new team:", teamName, teamEmails);
    // Logic to call createTeam API will be added here
  };

  const renderEmailItem = ({ item }) => (
    <View style={styles.emailListItem}>
      <Text style={styles.emailText}>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Create a New Team</Text>
      <Text style={styles.label}>Team Name</Text>
      <TextInput
        style={styles.input}
        value={teamName}
        onChangeText={setTeamName}
        placeholder="Enter team name"
      />

      <Text style={styles.label}>Add Team Members</Text>
      <View style={styles.emailInputContainer}>
        <TextInput
          style={styles.emailInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter teammate's email"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddEmail}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={teamEmails}
        renderItem={renderEmailItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.emailList}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateTeam}>
        <Text style={styles.buttonText}>Create Team</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#d0d0d0",
  },
  emailInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  emailInput: {
    flex: 1,
    marginRight: 8,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d0d0d0",
  },
  addButton: {
    backgroundColor: "#34A853",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
  },
  emailList: {
    marginTop: 20,
  },
  emailListItem: {
    backgroundColor: "#e1e1e1",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  emailText: {
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default NewTeamScreen;
