import { Model } from '~/src/Base/Model';
import { BPlayer } from '~/src/Models/BPlayer/BPlayer';
import type {IptvChannel} from "~/src/Controllers/Pages/HomeStack/IptvPage/IptvChannel";
import {appNavigator} from "~/src/Controllers/Navigation";

class VideoPlayerPageModel extends Model {
  private _initialChannel: IptvChannel | null;
  private readonly _bPlayer: BPlayer;
  constructor() {
    super();
    this._initialChannel = null;
    this._bPlayer = new BPlayer();
  }
  public init = () => {
    if (this._initialChannel === null) {
      // appNavigator().goBack();
      return;
    }

    this._bPlayer.loadLiveChannel(this._initialChannel.channelHash);

    let selectedItemEPG = this._initialChannel.epg.selectedItem;

    this._bPlayer.videoControls.init(this._initialChannel);
    this._bPlayer.videoControls.setPlaying(true);
  };
  public blur = () => {
    this._bPlayer.video.pause();
    this._bPlayer.videoControls.timer.stop();
    this._bPlayer.videoControls.hideControllers(true);
  };
  public get initialChannel() {
    return this._initialChannel;
  }
  public set initialChannel(value) {
    this._initialChannel = value;
  }
  public get bPlayer() {
    return this._bPlayer;
  }

  // public RemoteEvent = (type: RemoteEventType) => {
  //   console.log('RemoteEvent VideoPlayerPage', type);
  //   if (type === RemoteEventType.Back) {
  //     // EPG
  //     if (this._bPlayer.videoControls.controllerEPG.isVisible) {
  //       this._bPlayer.videoControls.controllerEPG.hide(this._bPlayer.videoControls.updateMe);
  //       this._bPlayer.videoControls.timer.start();
  //       // this._bPlayer.videoControls.controllerPlayPauseButton.setFocused(true);
  //       return;
  //     }
  //     // channel
  //     if (this._bPlayer.videoControls.controllerChannelList.isVisible) {
  //       // console.error("BACK PRESSED ON CONTROLS CHANNEL IS VISILBE")
  //       this._bPlayer.videoControls.controllerChannelList.hide(this._bPlayer.videoControls.updateMe);
  //       this._bPlayer.videoControls.timer.start();
  //       // this._bPlayer.videoControls.controllerPlayPauseButton.setFocused(true);
  //       return;
  //     }
  //     if (this._bPlayer.videoControls.isVisible) {
  //       this._bPlayer.videoControls.hideControllers();
  //       this._bPlayer.videoControls.timer.stop();
  //       return;
  //     }
  //     navigator().goBack();
  //     return;
  //   }
  //
  //   if (this._bPlayer.videoControls.controllerChannelList.isVisible && (type === RemoteEventType.Left || type === RemoteEventType.Right)) {
  //     if (this._bPlayer.videoControls.controllerChannelList.categoryFocusRef?.setFocused) {
  //       this._bPlayer.videoControls.controllerChannelList.categoryFocusRef.setFocused(true);
  //     }
  //   }
  //   // if (this._bPlayer.videoControls.isVisible) {
  //   //   this._bPlayer.videoControls.timer.start();
  //   //   return;
  //   // }
  //   // if (type === RemoteEventType.Select) {
  //   //   if (!this._bPlayer.videoControls.controllerPlayPauseButton.focused) {
  //   //     this._bPlayer.videoControls.controllerPlayPauseButton.onPress();
  //   //   }
  //   //   this._bPlayer.videoControls.controllerPlayPauseButton.setFocused(true);
  //   // }
  //   // if (type === RemoteEventType.Up || type === RemoteEventType.Left) {
  //   //   this._bPlayer.videoControls.TVHeaderModel.setFocused(true);
  //   // }
  //   // if (type === RemoteEventType.Right) {
  //   //   this._bPlayer.videoControls.TVFavoriteModel.setFocused(true);
  //   // }
  //   // if (type === RemoteEventType.Down) {
  //   //   this._bPlayer.videoControls.TVUpNextModel.setFocused(true);
  //   // }
  //   this._bPlayer.videoControls.showControllers();
  // };
}

export { VideoPlayerPageModel };
