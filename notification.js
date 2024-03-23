import { registerIndieID } from "native-notify";
import axios from "axios";

const sendNotificationToGroup = (subIds) => {
  console.log("in notif function " + subIds);
  // for (let i = 0; i < subIds.length; i++) {
  //   // register each user
  //   registerIndieID(subIds[i], 20328, "yo2NfEZ8YjS8ZvKH1iQspw");
  // }
  axios
    .post(`https://app.nativenotify.com/api/indie/notification`, {
      subIDs: subIds,
      appId: 20328,
      appToken: "yo2NfEZ8YjS8ZvKH1iQspw",
      title: "put your push notification title here as a string",
      message: "put your push notification message here as a string",
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

export const handleNotifyPress = (subIds) => {
  // array of member ids
  // call the function directly by passing in array of members id.
  console.log(subIds);
  sendNotificationToGroup(subIds);
};
