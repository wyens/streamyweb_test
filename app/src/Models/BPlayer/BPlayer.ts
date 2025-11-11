import { Model } from '../../Base/Model';
import { UserDataProvider } from '../../Base/UserDataProvider';
import { controllers } from '../../Controllers/Controllers';
import { BControl } from './BControl';
import { BController } from './BController';
import { BFullScreen } from './BFullScreen';
import { BListeners } from './BListeners';
import { BState } from './BPlayerState';
import { BTimeLine } from './BTimeLine';
import { BVideo } from './BVideo';
import { ControllerControlsVideo } from '../ControllerControlsVideo/ControllerControlsVideo.ts';
import { BVidDebug } from './BVidDebug.ts';

type playerModel = {
  onFullScreen?: () => void;
};
class BPlayer extends Model {
  private _model: playerModel = {};
  // IN PLAYER PROPERTIES
  private _isLive: boolean = true;
  // COMPONENTS
  private _video: BVideo;
  private _listeners: BListeners;
  private _control: BControl;
  private _state: BState;
  private _bController: BController;
  private _bFullScreen: BFullScreen;
  private _timeline: BTimeLine;
  private _videoControls: ControllerControlsVideo;
  private _bDebug: BVidDebug
  constructor(model: playerModel = {}) {
    super();
    this._video = new BVideo(this);
    this._listeners = new BListeners(this);
    this._control = new BControl(this);
    this._state = new BState(this);
    this._bController = new BController(this);
    this._bFullScreen = new BFullScreen(this);
    this._timeline = new BTimeLine(this);
    this._videoControls = new ControllerControlsVideo(this);
    this._bDebug = new BVidDebug();
    this._model = model;
  }

  get debug(){
    return this._bDebug
  }

  //FUNCTIONS
  loadLiveChannel = (channelHash: string) => {
    console.log('loadLiveChannel channelHash', channelHash);
    this._isLive = true;
    this._video.load(channelHash);
  };

  loadMovie = (movie_hash: any, episode: boolean = false) => {
    this._isLive = false;
    this._timeline.clear();
    this._video.load(movie_hash, episode);
  };

  get model() {
    return this._model;
  }

  //PROPERTIES GET
  get isLive() {
    return this._isLive;
  }

  // COMPONENTS GET
  get video() {
    return this._video;
  }
  public get videoControls() {
    return this._videoControls;
  }
  get listeners() {
    return this._listeners;
  }
  get control() {
    return this._control;
  }
  get state() {
    return this._state;
  }
  get bController() {
    return this._bController;
  }
  get bFullScreen() {
    return this._bFullScreen;
  }
  get timeline() {
    return this._timeline;
  }
}

export { BPlayer };
