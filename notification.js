import axios from "axios";
import { registerIndieID, unregisterIndieDevice } from "native-notify";
const appId = 20396;
const appToken = "dawozslCZUCVBogYZ1F3t4";

const isUserRegistered = async (subId) => {
  try {
    const response = await axios.get(
      `https://app.nativenotify.com/api/expo/indie/sub/${appId}/${appToken}/${subId}`
    );
    // Assuming the response will indicate if the user is registered.
    // Adjust this based on the actual response structure.
    return response.data && response.data.registered;
  } catch (error) {
    console.error("Error checking user registration:", error);
    return false; // Assume not registered if there's an error
  }
};

const sendNotificationToUserToVote = async (subId, meetingName) => {
  try {
    const response = await axios.post(
      `https://app.nativenotify.com/api/indie/notification`,
      {
        subID: subId, // Use the passed subId for the notification
        appId: appId,
        appToken: appToken,
        title: "Attention",
        message: `Please confirm your attendance for ${meetingName}.`,
      }
    );
    console.log("Notification sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

export const handleNotifyPingPress = async (subId, meetingName) => {
  console.log("Checking registration for subId:", subId);
  const registered = await isUserRegistered(subId);
  if (registered) {
    console.log("User is registered, sending notification...");
  } else {
    registerIndieID(subId, 20396, "dawozslCZUCVBogYZ1F3t4"); // Register for notifications
  }
  sendNotificationToUserToVote(subId, meetingName);
};
