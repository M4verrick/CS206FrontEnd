import React from "react";
import registerNNPushToken from "native-notify";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import MeetingConfigurationScreen from "./screens/MeetingConfiguration";
import NewTeamScreen from "./screens/CreateTeam";
import TestPage from "./screens/Testpage";
import CommonTimeslots from "./screens/CommonTimeslots";
import SignUpScreen from "./screens/SignUpScreen";
import RescheduleMeetingScreen from "./screens/RescheduleMeetingScreen";
import MeetingList from "./screens/MeetingList";
import { UserProvider } from "./screens/UserContext";
import NotifTest from "./screens/NotifTest";

const Stack = createStackNavigator();

export default function App() {
  registerNNPushToken(20328, "yo2NfEZ8YjS8ZvKH1iQspw");
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
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
            name="CreateTeam"
            component={NewTeamScreen}
            options={{ headerShown: true, title: "CreateTeam" }}
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
          <Stack.Screen
            name="RescheduleMeeting"
            component={RescheduleMeetingScreen}
            options={{ headerShown: true, title: "RescheduleMeeting" }}
          />
          <Stack.Screen
            name="NotifTest"
            component={NotifTest}
            options={{ headerShown: true, title: "NotifTest" }}
          />
          <Stack.Screen
            name="MeetingList"
            component={MeetingList}
            options={{ headerShown: true, title: "Meetings" }}
          />

          {/* ...other screens if any */}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
