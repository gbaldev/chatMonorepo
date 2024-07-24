import { NativeModules, Platform } from 'react-native';

const { NotificationsAndroid, NotificationsIOS } = NativeModules;

export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    return NotificationsAndroid.requestPermissions();
  } else {
    return NotificationsIOS.requestPermissions();
  }
};

export const checkPermissions = async () => {
  if (Platform.OS === 'android') {
    return NotificationsAndroid.checkPermissions();
  } else {
    return NotificationsIOS.checkPermissions();
  }
};

export const sendNotification = ({ title, body }: any) => {
  if (Platform.OS === 'android') {
    NotificationsAndroid.sendNotification({ title, body });
  } else {
    NotificationsIOS.sendNotification({ title, body });
  }
};

export const RegisterBackgroundTask = () => {
  Platform.select({
    ios: NativeModules.BackgroundTaskModule.startBackgroundTask(),
    android: () => console.log('No background task needed for android'),
  })();
};

export default { requestPermissions, checkPermissions, sendNotification };
