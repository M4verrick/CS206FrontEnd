import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Service from "../service";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    Service.signUp(username, email, password)
      .then(() => {
        // Navigate to the Login screen upon successful sign-up
        navigation.navigate("Login");
      })
      .catch((error) => {
        // handle sign-up errors (e.g., show an alert or set error message state)
        console.error("Sign up error:", error);
      });

    // try {

    //   const response = await fetch('http://10.87.13.193:8080/api/v1/user/addUser', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(user),
    //   });

    //   if (response.ok) {
    //     const result = await response.text(); // Changed from response.json() to response.text()
    //     console.log('User registered:', result);
    //     Alert.alert("Success", "User registered successfully.", [
    //       { text: "OK", onPress: () => navigation.navigate('Login') }
    //     ]);
    //   } else {
    //     const errorResult = await response.text(); // Assuming the server sends the error details as text
    //     console.error('Error signing up:', errorResult);
    //     Alert.alert("Sign Up Failed", errorResult);
    //   }
    // } catch (error) {
    //   console.error('Network error:', error);
    //   Alert.alert("Network Error", "An error occurred. Please try again later.");
    // }

    //BACKEND INTEGRATED AND TESTED....BLOCKED OUT AS I TESTED W PERSONAL IP
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.logo}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          onChangeText={setUsername}
          value={username}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handleSignUp(username, email, password)}
      >
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    marginBottom: 30,
    fontWeight: "bold",
    fontSize: 50,
    color: "black",
  },
  inputContainer: {
    width: "80%",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 40, // Adjust the value to match the margin of the LoginScreen
    color: "black", // Use the color from your LoginScreen
    fontWeight: "bold", // Use the font weight from your LoginScreen
    marginBottom: 5, // Adjust spacing if needed
  },
  input: {
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default SignUpScreen;
