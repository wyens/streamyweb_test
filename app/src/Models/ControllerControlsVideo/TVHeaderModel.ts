import { Model } from '../../Base/Model';

type TVHeaderInit = {
  onPress?: () => void;
  title?: string;
};

class TVHeaderModel extends Model {
  private _focused = false;
  private _onPress?: () => void;

  private _title = '';

  constructor() {
    super();
  }

  public init = (opts?: TVHeaderInit) => {
    if (!opts) {
      return;
    }

    if (typeof opts.onPress === 'function') {
      this._onPress = opts.onPress;
    }
    if (typeof opts.title === 'string') {
      this._title = opts.title;
    }

    this.updateMe();
  };

  public reset = () => {
    this._focused = false;
    this._onPress = undefined;
    this._title = '';
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

  onPress = () => {
    this._onPress?.();
  };
}

export { TVHeaderModel, type TVHeaderInit };
