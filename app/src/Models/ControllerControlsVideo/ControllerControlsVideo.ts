import { Model } from '../../Base/Model';
import  {BPlayer} from "~/src/Models/BPlayer/BPlayer";
import  {Timer} from "~/src/Models/ControllerControlsVideo/Timer";
import  {ControllerPlayPauseButton} from "~/src/Models/ControllerControlsVideo/ControllerPlayPauseButton";
import  { TVFavoriteModel } from "./TVFavoriteModel";
import  { TVHeaderModel } from "./TVHeaderModel";
import  { TVInfoModel } from "./TVInfoModel";
import  { TVUpNextModel } from "./TVUpNextModel";
import  { ControllerEPG } from "./EPGList/ControllerEPG";
import  {ControllerChannelList} from "~/src/Models/ControllerControlsVideo/ChannelList/ControllerChannelList";
import type {IptvChannel} from "~/src/Controllers/Pages/HomeStack/IptvPage/IptvChannel";
import {appNavigator} from "~/src/Controllers/Navigation";

class ControllerControlsVideo extends Model {
  private readonly _player: BPlayer;
  private readonly _timer: Timer;
  private readonly _TVHeaderModel: TVHeaderModel;
  private readonly _TVFavoriteModel: TVFavoriteModel;
  private readonly _controllerPlayPauseButton: ControllerPlayPauseButton;
  private readonly _TVInfoModel: TVInfoModel;
  private readonly _TVUpNextModel: TVUpNextModel;
  private readonly _controllerEPG: ControllerEPG;
  private readonly _controllerChannelList: ControllerChannelList;

  private _isVisible = false;

  // private _opacity = new Animated.Value(0);

  private _duration = 520;

  private _isPlaying: boolean = true;

  constructor(player: BPlayer) {
    super();
    this._player = player;
    this._timer = new Timer(5, this.hideControllersTimer);
    this._TVHeaderModel = new TVHeaderModel();
    this._TVFavoriteModel = new TVFavoriteModel();
    this._controllerPlayPauseButton = new ControllerPlayPauseButton(this.playStop);
    this._TVInfoModel = new TVInfoModel();
    this._TVUpNextModel = new TVUpNextModel();
    this._controllerEPG = new ControllerEPG();
    this._controllerChannelList = new ControllerChannelList(this);
  }

  public init = (data: IptvChannel) => {
    // header
    console.log('init data', data);
    this._TVHeaderModel.init({
      title: data.title,
      onPress: this.goBack,
    });
    this._TVFavoriteModel.init({
      isFavorite: data.data.favoritesStatus,
      channel_id: data.data.channel_hash,
      channel: data,
    });
    let subscriptionName = 'L-max • TVPG';
    this._TVInfoModel.init({
      title: data?.selectedEpg?.name || '',
      timeText: data?.selectedEpg?.betweens || '',
      metaText: subscriptionName,
      logoSource: data?.icon,
      live: true,
      onPress: () => console.log('open details'),
    });

    this._TVUpNextModel.init({
      title: data?.nextEpg?.name || '',
      timeText: data?.nextEpg?.betweens || '',
      metaText: data?.nextEpg?.betweens || '',
      live: true,
      onPress: this.showEPGList,
    });

    // this._TVHeaderModel.setFocused(true);
  };

  // ===== getters =====
  get bPlayer() {
    return this._player;
  }
  get TVHeaderModel() {
    return this._TVHeaderModel;
  }
  get TVFavoriteModel() {
    return this._TVFavoriteModel;
  }
  get controllerPlayPauseButton() {
    return this._controllerPlayPauseButton;
  }
  get TVInfoModel() {
    return this._TVInfoModel;
  }
  get TVUpNextModel() {
    return this._TVUpNextModel;
  }
  get controllerEPG() {
    return this._controllerEPG;
  }
  get controllerChannelList() {
    return this._controllerChannelList;
  }
  get timer() {
    return this._timer;
  }
  get isPlaying() {
    return this._isPlaying;
  }
  get isVisible() {
    return this._isVisible;
  }
  // get opacity() {
  //   return this._opacity;
  // }

  public showControllers = () => {
    if (this._isVisible) {
      return;
    }
    this._timer.start();
    this._isVisible = true;
    this.updateMe();
    // Animated.timing(this._opacity, {
    //   toValue: 1,
    //   duration: this._duration,
    //   easing: Easing.out(Easing.cubic),
    //   useNativeDriver: true,
    // }).start();
  };

  public hideControllers = (immediate: boolean = false): Promise<void> => {
    if (!this._isVisible) {
      return Promise.resolve();
    }
    this.removeAllFocus();
    if (immediate) {
      // this._opacity.stopAnimation();
      // this._opacity.setValue(0);
      this._isVisible = false;
      this.updateMe();
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
        this._isVisible = false;
        this.updateMe();
        resolve();
      // Animated.timing(this._opacity, {
      //   toValue: 0,
      //   duration: this._duration,
      //   easing: Easing.in(Easing.cubic),
      //   useNativeDriver: true,
      // }).start(() => {
      //   this._isVisible = false;
      //   this.updateMe();
      //   resolve();
      // });
    });
  };

  public removeAllFocus = () => {
    this._TVHeaderModel.setFocused(false);
    this._controllerPlayPauseButton.setFocused(false);
    this._TVInfoModel.setFocused(false);
    this._TVUpNextModel.setFocused(false);
  };
  public playStop = () => {
    if (this._isPlaying) {
      this.bPlayer.video.pause();
      this._timer.stop();
    } else {
      this.bPlayer.video.play();
      this._timer.start();
    }
  };
  setPlaying = (bool: boolean) => {
    this._isPlaying = bool;
    this._controllerPlayPauseButton.isPlaying = bool;
  };

  public goBack = () => {
    appNavigator().goBack();
  };
  public hideControllersTimer = () => {
    if (!this._isPlaying || this._controllerEPG.isVisible || this._controllerChannelList.isVisible) {
      return;
    }
    this._timer.stop();
    this.hideControllers();
  };

  public showEPGList = () => {
    this._controllerEPG.show(this.updateMe);
  };
  public showChannelList = () => {
    this._controllerChannelList.show(this.updateMe);
  };
}

export { ControllerControlsVideo };
