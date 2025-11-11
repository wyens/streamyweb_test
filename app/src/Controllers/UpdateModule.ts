import DeviceInfo from 'react-native-device-info';
import { Modal } from '../Models/Modal';
import { loadData, UserDataProvider } from '../Base/UserDataProvider';
import semver from 'semver'
import { Linking } from 'react-native';

const appVersion = DeviceInfo.getVersion();
const buildNumber = DeviceInfo.getBuildNumber();

class UpdateModule extends Modal {
    _current: string = appVersion

    getVersion = async () => {
        const response = await loadData(UserDataProvider.getAppVersion, {})
        return response.data.version
    }

    compareVersion = async (): Promise<boolean> => {
        const serverVersion = await this.getVersion()
        if (serverVersion && semver.valid(serverVersion) && semver.valid(this._current)) {
            if (semver.gt(serverVersion, this._current)) {
                // console.log("A new version is available:", serverVersion)
                this.show()
                return true
                // You can show an update prompt here
            } else {
                // console.log("App is up to date.")
                return false
            }
        } else {
            // console.error("Invalid version format.")
            return false
        }
    }

    onPressUpdate = () => {
    }
}

export { UpdateModule }