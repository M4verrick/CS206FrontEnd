import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import Service from "../service";
import { useMeetingIdContext } from "../MeetingIdContext";
import { useUserTeamIdContext } from "../UserTeamIdContext";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addMeetingIds } = useMeetingIdContext();
  const { addUserTeamId } = useUserTeamIdContext();

  const handleLoginPress = async () => {
    try {
      const user = await Service.login(email, password);
      if (user) {
        console.log("Login Successful", user);
        addMeetingIds([...user.userMeetingIds]);
        addUserTeamId([...user.teamIds]);
        Service.connectGoogleCalendar(user.id);
        navigation.navigate("Testpage"); // Navigate to the next screen
      } else {
        // If the user entity is not returned, treat it as a failed login
        Alert.alert(
          "Login Failed",
          "The email or password you entered is incorrect."
        );
      }
    } catch (error) {
      Alert.alert(
        "Login Error",
        "There was a problem logging in. Please try again."
      );
    }
  };

  const handleForgotPasswordPress = () => {
    // TODO: Navigate to your Forgot Password Screen
    console.log("Forgot Password pressed");
  };

  const handleSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handleLoginPress(email, password)}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPasswordPress}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUpPress}>
        <Text style={styles.signUp}>
          Don’t have an account? Sign up{" "}
          <Text style={styles.signUpHere}>HERE</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    height: 100, // Adjust based on your logo's aspect ratio
    resizeMode: "contain", // or 'cover', depending on your preference
  },
  inputContainer: {
    width: "80%",
  },
  label: {
    fontWeight: "bold",
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
  forgotPassword: {
    color: "blue",
    marginVertical: 10,
  },
  signUp: {
    textAlign: "center",
    marginTop: 10,
  },
  signUpHere: {
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
