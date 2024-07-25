import { NativeModules, Platform } from 'react-native';

const { NotificationsAndroid, NotificationsIOS, BackgroundTaskModule } =
  NativeModules;
const isAndroid = Platform.OS === 'android';

export const requestPermissions = async () => {
  if (isAndroid) {
    return NotificationsAndroid.requestPermissions();
  } else {
    return NotificationsIOS.requestPermissions();
  }
};

export const checkPermissions = async () => {
  if (isAndroid) {
    return NotificationsAndroid.checkPermissions();
  } else {
    return NotificationsIOS.checkPermissions();
  }
};

export const sendNotification = ({ title, body }: any) => {
  if (isAndroid) {
    NotificationsAndroid.sendNotification({ title, body });
  } else {
    NotificationsIOS.sendNotification({ title, body });
  }
};

export const RegisterBackgroundTask = () => {
  if (isAndroid) {
    console.log('No background task needed for android');
  } else {
    BackgroundTaskModule.startBackgroundTask();
  }
};

export default { requestPermissions, checkPermissions, sendNotification };
