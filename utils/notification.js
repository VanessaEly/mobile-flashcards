import { AsyncStorage }  from 'react-native'
import { Notifications , Permissions } from 'expo'

const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

export const setLocalNotification = () => {
  // making sure we haven't set a local notification
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      // if we haven't set the notification
      if (data === null) {
        // ask for notification permission
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            // if the permission is granted
            if (status === 'granted') {
              // if there's already a notification scheduled, cancel that
              Notifications.cancelAllScheduledNotificationsAsync();

              // setting time to tomorrow 8PM
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day', // daily repeat
                }
              );
              // setting the notification into the local storage
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    })
}

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export const createNotification = () => {
  return {
    title: 'Hey, have you studied today?',
    body: "👋 We miss you, don't forget about daily Quiz",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}