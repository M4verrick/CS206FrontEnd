import { registerIndieID } from "native-notify";
import axios from "axios";

const sendNotificationToGroup = (subIds) => {
  for (let i = 0; i < subIds.length; i++) {
    // register each user
    registerIndieID(subIds[i], 19951, "HGVUixSBBBrdpJbzgm8sZf");
  }
  axios
    .post(`https://app.nativenotify.com/api/indie/group/notification`, {
      subIDs: subIds,
      appId: 19951,
      appToken: "HGVUixSBBBrdpJbzgm8sZf",
      title: "SchedEase",
      message: "Everyone has joined Team CS 301.",
    })
    .then((response) => {
      console.log("Notification sent successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
      console.log(error);
    });
};

// get team entity from backend
// Example function to register a user ID for push notifications
// You'll need to replace this with your actual implementation
const registerForPushNotification = (userId) => {
  console.log(`Registering user ID ${userId} for push notifications`);
  // Implement the registration logic here
};

// Function to retrieve a team entity and register user IDs for push notifications
const retrieveTeamAndRegisterUsers = async (teamId) => {
  try {
    const response = await fetch(`/api/teams/${teamId}`);
    if (!response.ok) {
      throw new Error(`Error fetching team: ${response.statusText}`);
    }
    const teamEntity = await response.json();
    // Assuming user IDs are stored in an array property called `userIds`
    const userIds = teamEntity.userIds;

    userIds.forEach((userId) => {
      registerForPushNotification(userId);
    });
  } catch (error) {
    console.error("Failed to retrieve team and register users:", error);
  }
};

// Example usage
retrieveTeamAndRegisterUsers("yourTeamIdHere");

export const handleNotifyPress = (allMembersSubIds) => {
  // array of member ids
  // call the function directly by passing in array of members id.
  sendNotificationToGroup(allMembersSubIds);
};
