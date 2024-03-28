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
const sendNotificationToUser = async (subId, teamName) => {
  try {
    const response = await axios.post(
      `https://app.nativenotify.com/api/indie/notification`,
      {
        subID: subId, // Use the passed subId for the notification
        appId: appId,
        appToken: appToken,
        title: "Attention",
        message: `A new team "${teamName}" has been created. Please check it out!`,
      }
    );
    console.log("Notification sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

const sendNotificationToUserForMeting = async (subId, teamName) => {
  try {
    const response = await axios.post(
      `https://app.nativenotify.com/api/indie/notification`,
      {
        subID: subId, // Use the passed subId for the notification
        appId: appId,
        appToken: appToken,
        title: "Attention",
        message: `A new meeting for "${teamName}" has been created. Please check it out!`,
      }
    );
    console.log("Notification sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
const sendNotificationForScheduledMeeting = async (subId, meetingName) => {
  try {
    const response = await axios.post(
      `https://app.nativenotify.com/api/indie/notification`,
      {
        subID: subId, // Use the passed subId for the notification
        appId: appId,
        appToken: appToken,
        title: "Meeting Scheduled",
        message: `The meeting "${meetingName}" has been successfully scheduled.`,
      }
    );
    console.log(
      "Scheduled meeting notification sent successfully:",
      response.data
    );
  } catch (error) {
    console.error("Error sending scheduled meeting notification:", error);
  }
};

export const notifyUsersAboutTeamCreation = async (userIds, teamName) => {
  for (const userId of userIds) {
    console.log(`Processing notification for userId: ${userId}`);
    const isRegistered = await isUserRegistered(userId);
    if (!isRegistered) {
      console.log(`Registering userId: ${userId}`);
      registerIndieID(userId, appId, appToken); // Register the user
      // Consider adding a slight delay after registration to ensure
      // the registration process is complete before sending a notification.
      // However, this might not be necessary depending on how registerIndieID functions internally.
    }

    // Wait a moment after registration before attempting to send a notification
    setTimeout(() => {
      console.log(`Sending team creation notification to userId: ${userId}`);
      sendNotificationToUser(userId, teamName);
    }, 500); // Adjust delay as necessary
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
export const notifyUsersOfScheduledMeeting = async (userIds, meetingName) => {
  for (const userId of userIds) {
    console.log(
      `Processing notification for scheduled meeting for userId: ${userId}`
    );
    const isRegistered = await isUserRegistered(userId);
    if (!isRegistered) {
      console.log(`User ${userId} is not registered. Registering now...`);
      registerIndieID(userId, appId, appToken); // Register the user
      // Consider adding a slight delay after registration to ensure
      // the registration process is complete before sending a notification.
      // However, this might not be necessary depending on how registerIndieID functions internally.
    }

    // Wait a moment after registration before attempting to send a notification
    setTimeout(() => {
      console.log(
        `Sending scheduled meeting notification to userId: ${userId}`
      );
      sendNotificationForScheduledMeeting(userId, meetingName);
    }, 500); // Adjust delay as necessary
  }
};

export const notifyTeamOfNewMeeting = async (teamName, teamUserIds) => {
  for (const userId of teamUserIds) {
    console.log(`Processing user: ${userId}`);
    try {
      // Check if the user is registered for notifications
      const isRegistered = await isUserRegistered(userId);
      if (!isRegistered) {
        console.log(`User ${userId} is not registered. Registering now...`);
        // Register the user if they are not registered
        await registerIndieID(userId, appId, appToken);
        console.log(`User ${userId} registered successfully.`);
      }
      // After ensuring the user is registered, send the notification
      console.log(`Sending notification to user: ${userId}`);
      await sendNotificationToUserForMeting(userId, teamName);
      console.log(`Notification sent to user: ${userId}`);
    } catch (error) {
      console.error(`Error processing user ${userId}:`, error);
    }
  }
};
