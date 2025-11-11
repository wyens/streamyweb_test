import { ImageSourcePropType } from 'react-native';
import { Model } from '../../Base/Model';

type TVInfoInit = {
  onPress?: () => void;
  title?: string;
  timeText?: string;
  metaText?: string;
  logoSource?: ImageSourcePropType;
  live?: boolean;
};

class TVInfoModel extends Model {
  private _focused = false;
  private _onPress?: () => void;

  private _title = '';
  private _timeText = '';
  private _metaText = '';
  private _logoSource?: ImageSourcePropType;
  private _live = false;

  constructor() {
    super();
  }

  public init = (opts?: TVInfoInit) => {
    if (!opts) {
      return;
    }

    if (typeof opts.onPress === 'function') {
      this._onPress = opts.onPress;
    }
    if (typeof opts.title === 'string') {
      this._title = opts.title;
    }
    if (typeof opts.timeText === 'string') {
      this._timeText = opts.timeText;
    }
    if (typeof opts.metaText === 'string') {
      this._metaText = opts.metaText;
    }
    if (typeof opts.live === 'boolean') {
      this._live = opts.live;
    }
    if (typeof opts.logoSource !== 'undefined') {
      this._logoSource = opts.logoSource;
    }

    this.updateMe();
  };

  public reset = () => {
    this._focused = false;
    this._onPress = undefined;
    this._title = '';
    this._timeText = '';
    this._metaText = '';
    this._logoSource = undefined;
    this._live = false;
    this.updateMe();
  };

  get focused() {
    return this._focused;
  }
  set focused(v: boolean) {
    this._focused = v;
  }
  setFocused = (v: boolean) => {
    this._focused = v;
    this.updateMe();
  };

  get title() {
    return this._title;
  }
  set title(v: string) {
    this._title = v;
    this.updateMe();
  }

  get timeText() {
    return this._timeText;
  }
  set timeText(v: string) {
    this._timeText = v;
    this.updateMe();
  }

  get metaText() {
    return this._metaText;
  }
  set metaText(v: string) {
    this._metaText = v;
    this.updateMe();
  }

  get logoSource() {
    return this._logoSource;
  }
  set logoSource(v: ImageSourcePropType | undefined) {
    this._logoSource = v;
    this.updateMe();
  }

  get live() {
    return this._live;
  }
  set live(v: boolean) {
    this._live = v;
    this.updateMe();
  }

  onPress = () => {
    this._onPress?.();
  };
}

export { TVInfoModel, type TVInfoInit };
