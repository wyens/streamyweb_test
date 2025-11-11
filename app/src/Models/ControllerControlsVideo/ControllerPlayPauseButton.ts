import { Model } from '../../Base/Model';

class ControllerPlayPauseButton extends Model {
  private _isPlaying: boolean;
  private _focused: boolean;
  private readonly _onPress: () => void;
  constructor(onPress: () => void) {
    super();
    this._onPress = onPress;
    this._focused = false;
    this._isPlaying = true;
  }

  public get isPlaying() {
    return this._isPlaying;
  }
  public set isPlaying(value: boolean) {
    this._isPlaying = value;
    this.updateMe();
  }
  public get focused() {
    return this._focused;
  }
  public set focused(value: boolean) {
    this._focused = value;
  }
  public onPress = () => {
    console.log('playStop onPress')
    this._onPress && this._onPress();
  };

  public setFocused = (isFocused: boolean) => {
    this._focused = isFocused;
    this.updateMe();
  };
}

export { ControllerPlayPauseButton };
