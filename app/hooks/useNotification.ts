import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export default function useNotification() {
  const getDeviceToken = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    console.log("Expo Push Token:", token.data);

    const fcmToken = await Notifications.getDevicePushTokenAsync();
    console.log("FCM Token:", fcmToken.data);
  };

  useEffect(() => {
    getDeviceToken();

    Notifications.addNotificationReceivedListener((notification) => {
      console.log("Notification received:", notification);
    });

    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification response:", response);
    });
  }, []);
}
