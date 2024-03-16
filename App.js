import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen"; // Adjust the path if necessary
import MeetingConfigurationScreen from "./screens/MeetingConfiguration";
import NewTeamScreen from "./screens/CreateMeeting";
import TestPage from "./screens/Testpage";
import CommonTimeslots from "./screens/CommonTimeslots";
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MeetingConfiguration"
          component={MeetingConfigurationScreen}
          options={{ headerShown: true, title: "Meeting Configuration" }}
        />
        <Stack.Screen
          name="CreateMeeting"
          component={NewTeamScreen}
          options={{ headerShown: true, title: "CreateMeeting" }}
        />
        <Stack.Screen
          name="Testpage"
          component={TestPage}
          options={{ headerShown: true, title: "Testpage" }}
        />
        <Stack.Screen
          name="CommonTimeslots"
          component={CommonTimeslots}
          options={{ headerShown: true, title: "CommonTimeslots" }}
        />

        {/* ...other screens if any */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
