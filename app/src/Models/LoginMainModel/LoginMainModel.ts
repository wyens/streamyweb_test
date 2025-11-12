import { Model } from '../../Base/Model';
import  {Timer} from "~/src/Models/ControllerControlsVideo/Timer";
import DeviceInfoCollector from "~/src/Base/DeviceInfoCollector";
import {loadData, UserDataProvider} from "~/src/Base/UserDataProvider";
import {controllers} from "~/src/Controllers/Controllers";
import {appNavigator} from "~/src/Controllers/Navigation";


export enum StateLogin {
  'preloader' = 0,
  'code' = 1,
}
class LoginMainModel extends Model {
  private readonly _timer: Timer;
  private _state: StateLogin;
  private _code: string | null = null;
  constructor() {
    super();
    this._timer = new Timer(5, this.checkIfActiveDevice);
    this._state = StateLogin.preloader;
    this._code = null;
  }

  public init = async () => {
    const response = await this.sendDeviceInfo();
    console.log('sendDeviceInfo', response);

    if (response.statusCode === 200) {
      this._code = response.data.code;
      this.state = StateLogin.code;
    }
      // setTimeout(() => {
      //     appNavigator().goToHomePage({});
      // }, 5000)
  };

  public blur = async () => {
  };
  get timer() {
    return this._timer;
  }
  public get code() {
    return this._code;
  }
  public get state() {
    return this._state;
  }
  public set state(value: StateLogin) {
    this._state = value;
    this.updateMe();

    if (this._state === StateLogin.code) {
      // Start timer for requests
      this._timer.start();
    }
  }

  public checkIfActiveDevice = async () => {
    if (this._state === StateLogin.preloader) {
      return;
    }
    // return;
    const body = {
      code: this._code,
    };
    const response = await loadData(UserDataProvider.checkActivation, body);
    console.log('checkIfActiveDevice', response);
    if (response.statusCode !== 200) {
      this._timer.start();
      return;
    }
    controllers().auth.login(response.data.token);
    this._timer.stop();
  };

  public sendDeviceInfo = async () => {
    const device = await DeviceInfoCollector.getInfo();
    console.log("DEVICE", device)
    const body = {
      device_name: `${device.brand} ${device.model}`,
      device_type: `${device.platform} ${device.screenWidth}x${device.screenHeight}`,
      device_identifier: device.uniqueId,
    };
      console.log("body", body)
    const response = await loadData(UserDataProvider.sendDevice, body);
    console.log("RESPONSE", response)
    return response;
  };
}

export { LoginMainModel };
