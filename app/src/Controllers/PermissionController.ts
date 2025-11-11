import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation, { GeolocationOptions } from '@react-native-community/geolocation';
import { controllers } from './Controllers';
import { check, PERMISSIONS, request, requestMultiple, RESULTS } from 'react-native-permissions';

type perm = 'geolocation' | 'notification' | 'photoLibrary';

type permissionObject = {
  type: perm;
  status: boolean;
  checked: boolean;
};
class PermissionController {
  private readonly _getGeoOptions: GeolocationOptions;
  private _needPermission: Array<permissionObject>;
  private _checkGeoProgress: boolean;

  constructor() {
    this._checkGeoProgress = false;
    this._getGeoOptions = {
      timeout: 5000,
      maximumAge: 0,
      enableHighAccuracy: true,
    };
    this._needPermission = [
      {
        type: 'geolocation',
        status: false,
        checked: false,
      },
      {
        type: 'notification',
        status: false,
        checked: false,
      },
      {
        type: 'photoLibrary',
        status: false,
        checked: false,
      },
    ];
  }

  get geolocationStatus() {
    return this._needPermission.find((perm) => perm.type === 'geolocation')?.status;
  }

  checkPermission = (perm: perm) => {
    switch (perm) {
      case 'geolocation':
        return this.checkGeolocation();
      case 'notification':
        return this.checkNotification();
      case 'photoLibrary':
        return this.checkPhotoLibrary();
    }
  };

  checkGeolocation = async () => {
    if (Platform.OS === 'ios') {
      // your code using Geolocation and asking for authorisation with
      await Geolocation.requestAuthorization();
      return this.checkPosition();
    } else {
      // ask for PermissionAndroid as written in your code
      await this.checkAndAskUserGeoPermission();
      return this.checkPosition();
    }
  };

  checkPosition = () => {
    return Geolocation.getCurrentPosition(this.geo_success, this.geo_error, this._getGeoOptions);
  };

  geo_success = (data: any) => {
    console.log('geo_success data,data', data);
    controllers().location.setPhoneLocation(data);
    const find = this._needPermission.findIndex((perm) => perm.type === 'geolocation');
    this._needPermission[find].checked = true;
    this._needPermission[find].status = true;
    return data;
  };
  geo_error = (ex: any) => {
    try {
      const find = this._needPermission.findIndex((perm) => perm.type === 'geolocation');
      this._needPermission[find].checked = true;
    } catch (e) {}
  };

  checkNotification = () => {
    if (Platform.OS === 'ios') {
    } else {
    }
  };

  checkPhotoLibraryPermitionsIOS = () => {
    check(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            this.requestPhotoLibrary();
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            // const find = this._needPermission.findIndex(perm=>perm.type === "photoLibrary")
            // this._needPermission[find].checked = true
            // this._needPermission[find].status = true
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        // …
      });
  };

  requestPhotoLibrary = () => {
    request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY).catch((e) => {
      console.error(e);
    });
  };

  checkPhotoLibrary = () => {
    if (Platform.OS === 'ios') {
      this.checkPhotoLibraryPermitionsIOS();
      return true;
    }
  };

  // android permission for location
  public checkAndAskUserGeoPermission = async () => {
    try {
      if (this._checkGeoProgress) {
        return false;
      }
      this._checkGeoProgress = true;
      const granted = await this.checkUserGeoPermission();
      if (granted) {
        console.log('You can use the ACCESS_FINE_LOCATION');
        this._checkGeoProgress = false;
        return true;
      }
      const result = await this.askUserGeoPermission();
      this._checkGeoProgress = false;
      return result;
    } catch (ex) {
      this._checkGeoProgress = false;
    }
  };
  public checkUserGeoPermission = async (): Promise<boolean> => {
    return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  };
  public askUserGeoPermission = async (): Promise<boolean> => {
    try {
      const permissions = [PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
      const status = await requestMultiple(permissions);
      const per1 = status[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
      const per2 = status[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION];
      return per1 === RESULTS.GRANTED || per2 === RESULTS.GRANTED;
    } catch (err) {
      console.warn('askUserGeoPermission EX', err);
      return false;
    }
  };
  public askUserGeoPermissionIOS = async (): Promise<boolean> => {
    try {
      const permissions = [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.LOCATION_ALWAYS];
      const status = await requestMultiple(permissions);
      const per1 = status[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE];
      const per2 = status[PERMISSIONS.IOS.LOCATION_ALWAYS];
      return per1 === RESULTS.GRANTED || per2 === RESULTS.GRANTED;
    } catch (err) {
      console.warn('askUserGeoPermission IOS  EX', err);
      return false;
    }
  };
  public checkAndAskUserGeoPermissionPlatform = async () => {
    if (Platform.OS === 'android') {
      return await this.checkAndAskUserGeoPermission();
    }
    if (Platform.OS === 'ios') {
      return await this.askUserGeoPermissionIOS();
    }
  };
}

export { PermissionController };
