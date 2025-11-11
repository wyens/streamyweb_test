import { Model } from '../../Base/Model';
import { controllers } from '../../Controllers/Controllers';
import { BPlayer } from './BPlayer';

class BController extends Model {
  private readonly _player: BPlayer;
  private _imShowed: boolean = true;
  private _playing: boolean = true;
  private _isFullScreen: boolean = false;

  constructor(player: BPlayer) {
    super();
    this._player = player;
  }

  get bPlayer() {
    return this._player;
  }

  get isLive() {
    return this.bPlayer.isLive;
  }

  get imShowed() {
    return this._imShowed;
  }
  get playing() {
    return this._playing;
  }
  get isFullScreen() {
    return this._isFullScreen;
  }
  get timeline() {
    return this.bPlayer.timeline;
  }

  playStop = () => {
    if (this._playing) {
      this.bPlayer.video.pause();
    } else {
      this.bPlayer.video.play();
    }
  };
  setPlaying = (bool: boolean) => {
    if (this._playing === bool) {
      return;
    }
    this._playing = bool;
    this.updateMe();
  };
  private setVisible = (bool: boolean) => {
    if (this._imShowed === bool) {
      return;
    }
    this._imShowed = bool;
    this.updateMe();
  };
  showMe = () => {
    this.setVisible(true);
  };
  hideMe = () => {
    this.setVisible(false);
    controllers().statusBar.setInFullScreen(this._isFullScreen);
  };

  toggleFullscreen = () => {
    if (!this._player.video.link) {
      return;
    }
    this.bPlayer.bFullScreen.toggle();
    this._isFullScreen = this.bPlayer.bFullScreen.enabled;
    if (this.bPlayer.model.onFullScreen) {
      this.bPlayer.model.onFullScreen();
    }
    // controllers().main.oneFilm.pageHeader.setHidden(this._isFullScreen);
    controllers().statusBar.setInFullScreen(this._isFullScreen);
    this.updateMe();
  };
}

export { BController };
