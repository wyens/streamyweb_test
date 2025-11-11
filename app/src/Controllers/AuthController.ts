import { HandleTask } from '../Base/HandleTask/HandleTask';
import { loadData, UserDataProvider } from '../Base/UserDataProvider';
import type {authBody, tokenBody} from '../DataTypes/BaseResponse';
import { coreupdate } from '../Helpers/actions';
import { UPDATE } from '../Helpers/constants';
import { readData } from '../Helpers/readData';
import { saveData } from '../Helpers/saveData';
import { controllers } from './Controllers';
import { stringParser } from '../Helpers/Helpers';
import { DateParse, dayDifferenceFromNow } from '../Helpers/DateParse';

export type signInResponseType = {
  status: boolean;
  message: string;
};
export type userVerifyTransporter = {
  geo: boolean;
  is_verifed_documents: boolean;
  is_verifed_userinfo: boolean;
};
type userInfoType = {
  'user': {
      id:string
      email:string
      username:string
      full_name:string
  };
  'device': {
      id:string
      device_name:string
      device_type:string
      is_active:string
  };
  'token_info': {
      expires_at:string
      is_active:string
      created_at:string
  },
  userToken: string
  endDate: string
};
export enum navigationMethods {
  'App' = 'In app navigation',
  'Google' = 'Google',
  'Apple' = 'Apple',
  'Waze' = 'Waze',
}

class AuthController {
  private _isLogin: boolean;
  private _userToken: string | null;
  private _userInfo: userInfoType | null;
  private _needToUserInfo: boolean = false;
  private _triedToResporeData: boolean;
  private _resoreDataHandler: HandleTask;
  private _userVerifyTransporter: userVerifyTransporter;
  private _navigationMethod: navigationMethods;
  private _tasks: HandleTask = new HandleTask();
  constructor() {
    this._navigationMethod = navigationMethods.App;
    this._isLogin = false;
    this._userToken = null;
    this._userInfo = null;
    this._triedToResporeData = false;
    this._resoreDataHandler = new HandleTask();
    this._userVerifyTransporter = {
      geo: false,
      is_verifed_documents: false,
      is_verifed_userinfo: false,
    };
  }

  get tasks(){
    return this._tasks
  }

  get all() {
    return {
      isLogin: this._isLogin,
      userToken: this.userToken,
      userInfo: this._userInfo,
      navigationMethod: this._navigationMethod,
      // language: this.language
    };
  }

  dateWasEnded = () => {
      const {userInfo} = this
      const endDaysLeft = userInfo !== null &&  userInfo?.endDate ? stringParser(dayDifferenceFromNow(DateParse(userInfo?.endDate||""))) : 0
      return endDaysLeft === 0
  }

  get isLogin() {
    return this._isLogin;
  }

  get userToken() {
    // return AppSettings.devMode ? "d49fc6a77d337708c91fb4b356f811471fb55f345a9e12bc1d60458602ad7aeb" : "user_authT_NuZCaS5gepR0KETOxdny2IF0RqiC4_XRuhywgOJfKrMELMHQ-chW5tVjU000SLTUNrOollPjXYi4D9YWVOq9R1ZEdFeqrF8cJTFwh1bpl_QHDoxhHiczRMgvx3lJG1rjHDEfV93HhpFLQPxTM1YpEfoZdjUO8VMSc5lI_aw2BslwHxdlds7T0ehZxZxcPrUTU%3D"
    // return "user_authT_0hndZAji9WbOMLFaCqut8K7jrp0ZVKUQ2h7CSswYDWcWAkwCi3m94UnfxLGLiacWf-7Fhy8PgbI-uUHixMq3MBN6MQQ-VU9oxwpjnOx0VjLU3jAVFP1Tgxw6nRALF-m5FdQ30001lt85wK76z1dkntaINiAKTqZ0EdTDlfHPdh9i8XM5mN98ioaKn8r4SLEHs%3D"
    return this._userToken;
  }

  get userInfo() {
    return this._userInfo;
  }
  public get userVerifyTransporter() {
    return this._userVerifyTransporter;
  }

  get restoreDataHandler() {
    return this._resoreDataHandler;
  }

  get triedToResporeData() {
    return this._triedToResporeData;
  }

  setTriedToRestoreData = (bool: boolean) => {
    this._triedToResporeData = bool;
  };

  // sign in btn press action
  async signIn(body: authBody) {
    const authBody: authBody = body;
    // console.log('authBody', authBody)
    const response = await loadData(UserDataProvider.authorization, authBody);
    // console.log('response', response)
    if (response.statusCode !== 200) {
      // controllers().alert.error(response.statusMessage)
      return {
        status: false,
        message: response.statusMessage && response.statusMessage !== '' ? response.statusMessage : 'Something went wrong',
      };
    }
    return {
      status: true,
      message: response.statusMessage,
    };
  }

  // do private auth with token
  login(userToken: string) {
    // console.log("LOGIN", userToken)
    if (!userToken) {
      return false;
    }
    this._isLogin = true;
    this._userToken = userToken;
    this.getUserInfo(true).then(() => {
      coreupdate(UPDATE.AUTH)
      // controllers().firebaseController.deviceToken.init().then();
    });
    this.saveMe();
  }

  afterAuth = () => {};

  signOut = async () => {
    const tokenBody: tokenBody = {
      userToken: this._userToken || '',
    };
    // sync request to server
    const response = await loadData(UserDataProvider.logout, tokenBody);
    // controllers().simplyAuth.google.signOut()
    console.log("logout", response)
    // clear storage update page
    this.logout();
  };

  private logout() {
    this._isLogin = false;
    this._userToken = null;
    this._userInfo = null;
    this.saveMe();
    this.updateMe();
    this.updateUser();
  }

  checkToken = async (withLoader: boolean = false) => {
    if (this._userToken === null) {
      return;
    }
    const tokenBody: tokenBody = {
      userToken: this._userToken || '',
    };
    if (withLoader) {
      // controllers().loader.show();
    }
    // sync request to server
    // const response = await loadData(UserDataProvider.check, tokenBody);
    // // wait success token
    // if(response.statusCode!==200){
    //   this.logout()
    // }
    // if not 200 logout
    // return false;
  };

  bindNoCompany = () => {
    // this._userInfo?.app_type = null
  };

  getUserInfo = async (update: boolean = false, withLoader: boolean = true) => {
    const tokenBody: tokenBody = {
      userToken: this._userToken || '',
    };
    // sync request to server
    const response = await loadData(UserDataProvider.userInfo, tokenBody);
    // wait success token
    if (response.statusCode === 200) {
      const data: userInfoType = response.data;
      this._userInfo = data;
      console.log('USERINFO', this._userInfo);
      // controllers().language.setLanguage(data.app_lang ? data.app_lang : 'en');
      // controllers().loader.hide();
      this.updateUser();
      if (update) {
        this.updateMe();
        this.afterAuth();
      }
      return
    }
    // console.log("USER INFO", this._userInfo)
    // if not 200 logout
    this.logout()
  };

  private saveMe = async () => {
    const userData = JSON.stringify(this.all);
    await saveData('secureUserData', userData);
    return true;
  };

  restoreMe = async () => {
    const data = await this.readData();
    console.log('restoreMe data', data)
    if (!data) {
      this.allreadyRestored();
      return;
    }
    // console.log('DATA',data)
    try {
      const userinfo = JSON.parse(data);
      // console.log('restoreMe userinfo',userinfo)
      this._isLogin = userinfo?.isLogin;
      this._userToken = userinfo?.userToken;
      this._userInfo = userinfo?.userInfo;
      this._navigationMethod = userinfo?.navigationMethod || navigationMethods.App;
      // console.log("userinfoLanguage", userinfo?.language)
      // controllers().language.setLanguage(userinfo?.language || "en")
      if (this._isLogin) {
        this.updateMe();
        this.updateUser();
      }
      this.allreadyRestored();
    } catch (e) {
      this.allreadyRestored();
      console.log('error restore data');
    }
  };
  public get navigationMethod() {
    return this._navigationMethod;
  }
  public saveNavigationMethod(value: navigationMethods) {
    this._navigationMethod = value;
    this.saveMe();
  }

  allreadyRestored = () => {
    this.setTriedToRestoreData(true);
    this._resoreDataHandler.do();
  };

  // get language(){
  //     return controllers().language.selectedLanguage
  // }

  saveLanguage = () => {
    this.saveMe();
  };

  private async readData(): Promise<any> {
    const data = await readData('secureUserData');
    return data;
  }

  private updateMe() {
    coreupdate(UPDATE.AUTH);
  }

  private updateUser() {
    coreupdate(UPDATE.USERINFO);
  }

}

export { AuthController };
