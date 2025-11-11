import { Platform } from 'react-native';
import { BPlayer } from './BPlayer';

class BListeners {
  private readonly _player: BPlayer;
  private _savedRef: any;
  constructor(player: BPlayer) {
    this._player = player;
  }

  //LISTENERS
  onPlay = () => {
    this.bPlayer.state.setPlaying(true);
    this.bPlayer.videoControls.setPlaying(true);
    this.bPlayer.debug.setItem("Status", "PLAY")
  };
  onPause = () => {
    this.bPlayer.state.setPlaying(false);
    this.bPlayer.videoControls.setPlaying(false);
    this.bPlayer.debug.setItem("Status", "PAUSED")
  };
  onCanPlay = (e: any) => {
    this.bPlayer.debug.setItem("LOAD", "FULLY LOADED")
    this.bPlayer.timeline.setDuration(Platform.OS === 'android' ? Math.round(e.duration) : Math.round(e.duration / 1000));
    this.bPlayer.state.setLoading(false);
    this.bPlayer.state.setPlaying(true);
  };
  onLoadStart = () => {
    this.bPlayer.state.setLoading(true);
    this.bPlayer.debug.setItem("LOAD", "STARTED")
  };
  onWaiting = () => {
    this.bPlayer.debug.setItem("LOAD", "WAITING")
    this.bPlayer.state.setLoading(true);
  };
  onTimeUpdated = (e: any) => {
    this.bPlayer.debug.setItem("PROGRESS", e)
    if (!this.bPlayer.isLive) {
      this.bPlayer.timeline.setTime(Platform.OS === 'android' ? Math.floor(e.currentTime) : Math.floor(e.currentTime / 1000));
    }
  };
  onLiveTimeUpdated = () => {};
  onDurationChanged = () => {};

  // BASE VISIBLE FUNCTIONS
  make = (ref: any) => {
    if (!ref) {
      return;
    }
    this._savedRef = ref;
    this.setListeners(this._savedRef);
  };
  clear = () => {
    if (!this._savedRef) {
      return;
    }
    this.removeListeners(this._savedRef);
    this._savedRef = null;
  };

  //MAKE LISTENERS AND CLEAR LISTENERS
  private setListeners = (ref: any) => {
    ref.addEventListener('play', this.onPlay);
    ref.addEventListener('pause', this.onPause);
    // ref.addEventListener('canplay', this.onCanPlay)
    // ref.addEventListener('loadstart', this.onLoadStart)
    // ref.addEventListener('waiting', this.onWaiting)
    // if(!this.bPlayer.isLive){
    //     ref.addEventListener('timeupdate', this.onTimeUpdated)
    //     ref.addEventListener('durationchange', this.onDurationChanged)
    // } else {
    //     ref.addEventListener('timeupdate', this.onLiveTimeUpdated)
    // }
  };

  private removeListeners = (ref: any) => {
    // ref.removeEventListener('play', this.onPlay)
    // ref.removeEventListener('pause', this.onPause)
    // ref.removeEventListener('canplay', this.onCanPlay)
    // ref.removeEventListener('loadstart', this.onLoadStart)
    // ref.removeEventListener('waiting', this.onWaiting)
    // if(!this._player.isLive){
    //     ref.removeEventListener('timeupdate', this.onTimeUpdated)
    //     ref.removeEventListener('durationchange', this.onDurationChanged)
    // } else {
    //     ref.removeEventListener('timeupdate', this.onLiveTimeUpdated)
    // }
  };

  // GETTERS
  get bPlayer() {
    return this._player;
  }
}

export { BListeners };
