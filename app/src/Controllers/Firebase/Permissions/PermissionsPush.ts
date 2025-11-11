import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
class PermissionsPush {
  public init = async () => {
    try {
      if (Platform.OS !== 'ios') {
        return;
      }
      const authStatus = await messaging().requestPermission({ sound: true, badge: true });
      return authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } catch (e) {
      console.log('permissionPush EX:', e);
    }
  };
}

export { PermissionsPush };
