
import { HomeStackModel } from './Stacks/HomeStackModel';
import {AuthController} from "~/src/Controllers/AuthController";
import  {AbortControl} from "~/src/Controllers/AbortControl";
import  {LanguageController} from "~/src/Controllers/LanguageController";


class ControllersImpl {
  // private readonly _statusBar: StatusBarController;
  // private readonly _media: MediaController;
  // private readonly _loader: LoaderController;
  // private readonly _alert: AlertController;
  private readonly _auth: AuthController;
  // private readonly _page: AuthStackModel;
  private readonly _home: HomeStackModel;
  // private readonly _modals: Modals;
  // private readonly _permission: PermissionController;
  // private readonly _responseLoader: ResponseLoader;
  private readonly _language: LanguageController;
  // private readonly _simplyAuth: SimplyAuth;
  // private readonly _updateModule: UpdateModule;
  // private readonly _remoteControls: RemoteControls;
  // private readonly _appStateControls: AppStateControls;
  private readonly _abortControl: AbortControl

  constructor() {
    // this._firebaseController = new FirebaseController();
    // this._media = new MediaController();
    // this._loader = new LoaderController();
    // this._alert = new AlertController();
    // this._responseLoader = new ResponseLoader();
    // this._page = new AuthStackModel();
    // this._modals = new Modals();
    // // this._permission = new PermissionController();
    // this._language = new LanguageController();
    // this._simplyAuth = new SimplyAuth();
    // this._statusBar = new StatusBarController();
    // this._updateModule = new UpdateModule();
    // // new
    // this._remoteControls = new RemoteControls();
    // this._appStateControls = new AppStateControls();
    //
    // this._abortControl = new AbortControl();
  }

  // get media() {
  //   return this._media;
  // }
  //
  // get loader() {
  //   return this._loader;
  // }
  //
  // get responseLoader() {
  //   return this._responseLoader;
  // }
  //
  // get alert() {
  //   return this._alert;
  // }
  //
  //
  // get page() {
  //   return this._page;
  // }
  //
  // get modals() {
  //   return this._modals;
  // }

  // get permission() {
  //   return this._permission;
  // }

  // get language() {
  //   return this._language;
  // }
  // public get firebaseController() {
  //   return this._firebaseController;
  // }

    get auth() {
        return this._auth ??= new AuthController();
    }

    get main() {
        return this._home ??= new HomeStackModel();
    }
    get language() {
        return this._language ??= new LanguageController();
    }

  // get simplyAuth() {
  //   return this._simplyAuth;
  // }
  //
  // get statusBar() {
  //   return this._statusBar;
  // }
  //
  // get updateModule() {
  //   return this._updateModule;
  // }
  // public get remoteControls() {
  //   return this._remoteControls;
  // }
  // public get appStateControls() {
  //   return this._appStateControls;
  // }
  //
  get abortControl(){
   return  this._abortControl ??= new AbortControl();
  }
}

// @ts-ignore
globalThis.__app__ = globalThis.__app__ || {};
// @ts-ignore
globalThis.__app__.controllers =
    globalThis.__app__.controllers || new ControllersImpl();

export function controllers(): ControllersImpl {
    // @ts-ignore
    return globalThis.__app__.controllers;
}