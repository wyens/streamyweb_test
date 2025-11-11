import { readData } from '../../../Helpers/readData';
import { saveData } from '../../../Helpers/saveData';

import messaging from '@react-native-firebase/messaging';
import { loadData, UserDataProvider } from '../../../Base/UserDataProvider';
import { controllers } from '../../Controllers';
class DeviceToken {
  public init = async () => {
    try {
      const tokenFromAsync = await readData('DeviceToken');
      const deviceToken = await messaging().getToken();
      if (deviceToken !== tokenFromAsync) {
        const result = await this.sendTokenFirebase(deviceToken);
        if (result === undefined || result.statusCode !== 200) {
          return;
        }
        await saveData('DeviceToken', deviceToken);
      }
    } catch (ex) {}
  };

  public async sendTokenFirebase(deviceToken: string | null) {
    try {
      if (deviceToken == null || deviceToken === 'unknown') {
        return;
      }
      const { userToken } = controllers().auth;
      if (!userToken) {
        return;
      }
      const body = {
        deviceToken: deviceToken,
        userToken: userToken,
      };
      console.log('sendTokenFirebase body', body);
      return await loadData(UserDataProvider.save_user_token, body);
    } catch (error: any) {}
  }
  public eventChangeDeviceToken() {
    messaging().onTokenRefresh(async (deviceToken) => {
      if (deviceToken) {
        await this.sendTokenFirebase(deviceToken);
      }
    });
  }
}

export { DeviceToken };
