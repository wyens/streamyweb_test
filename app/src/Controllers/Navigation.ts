import { HandleTask } from '../Base/HandleTask/HandleTask';
import { controllers } from './Controllers';

class NavigatorImpl {
  private _navigation: any;
  private readonly _handle: HandleTask;
  private _navigationMounded: boolean;
  private _saveScreen: Array<string>;
  private _currentScreen: string = '';
  // private _excludedList = ["OneFilm"]
  constructor() {
    this._handle = new HandleTask();
    this._navigationMounded = false;
    this._saveScreen = [];
  }

  get navigationMounted() {
    return this._navigationMounded;
  }

  get handle() {
    return this._handle;
  }

  get navigation() {
    return this._navigation;
  }

  get currentScreen() {
    return this._currentScreen;
  }

  set = (navigation: any) => {
    this._navigation = navigation;
    this._navigationMounded = true;
    this._handle.do();
  };

  back = () => {
    try {
      const findScreen = this._saveScreen[this._saveScreen.length - 2];
      if (!findScreen) {
        navigator().navigate('Movies');
        return;
      }
      this._saveScreen.pop();
      navigator().navigate(findScreen);
    } catch (e) {
      console.error('Error back', e);
    }
  };

  navigate = (pageName: string) => {
    if (
      this._navigation === null ||
      this._navigation === undefined ||
      this._navigation.navigate === null ||
      this._navigation.navigate === undefined
    ) {
      return;
    }
    this.shiftScreen(pageName);
    this._navigation.navigate(pageName);
    this.afterNavigation();
  };

  afterNavigation = () => {
  };
  // isExcluded = (pageName: string) => {
  //   return this._excludedList.find(e=>e === pageName) !== undefined
  // }

  clearFromHistory = (pageName: string) => {
    this._saveScreen = this._saveScreen.filter((s) => s !== pageName);
    this._saveScreen.pop();
  };
  shiftScreen = (pageName: string) => {
    if (this._currentScreen === pageName) {
      return;
    }
    this._saveScreen.push(pageName);
    this._currentScreen = pageName;
    if (this._saveScreen.length > 5) {
      const saveScreen = this._saveScreen;
      saveScreen.shift();
      this._saveScreen = saveScreen;
    }
  };
  focusScreen = (pageName: string) => {
    const lastOne = this._saveScreen[this._saveScreen.length - 1];
    if (pageName != lastOne) {
      this.shiftScreen(pageName);
    }
  };
  public goToMainListPage = (data: any) => {
    navigator().navigate('MainListPage');
  };
  public goToVideoPlayerPage = (channel: any) => {
    // const currentChannelSelected = controllers().main.videoPlayerPage.initialChannel
    // controllers().main.videoPlayerPage.initialChannel = channel;
    //
    // if (channel.onPressItem) {
    //   channel.onPressItem();
    // }
    //
    // if(this._currentScreen == "VideoPlayerPage" && currentChannelSelected && currentChannelSelected.title != channel.title){
    //   // console.log()
    //   controllers().main.videoPlayerPage.init()
    // }
    //
    // navigator().navigate('VideoPlayerPage');
  };

  public goBack = () => {
    navigator().navigation.goBack();
  };
}

// @ts-ignore
globalThis.__app__ = globalThis.__app__ || {};
// @ts-ignore
globalThis.__app__.navigator = globalThis.__app__.navigator || new NavigatorImpl();

export function navigator(): NavigatorImpl {
    // @ts-ignore
    return globalThis.__app__.navigator;
}