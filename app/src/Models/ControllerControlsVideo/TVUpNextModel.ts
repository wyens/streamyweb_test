import { Model } from '../../Base/Model';

type TVInfoInit = {
  onPress?: () => void;
  title?: string;
  timeText?: string;
  metaText?: string;
  logoSource?: any;
  live?: boolean;
};

class TVUpNextModel extends Model {
  private _focused = false;
  private _onPress?: () => void;
  private _title = '';
  private _metaText = '';
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
    if (typeof opts.metaText === 'string') {
      this._metaText = opts.metaText;
    }
    if (typeof opts.live === 'boolean') {
      this._live = opts.live;
    }

    this.updateMe();
  };
  public reset = () => {
    this._focused = false;
    this._onPress = undefined;
    this._title = '';
    this._metaText = '';
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

  get metaText() {
    return this._metaText;
  }
  set metaText(v: string) {
    this._metaText = v;
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
    console.log('TVUpNextModel onPress');
    this._onPress?.();
  };
}

export { TVUpNextModel, type TVInfoInit };
