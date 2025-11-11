import type {idType} from '../../DataTypes/BaseTypes';

class Dictionary {
  private _loaded: boolean;
  private _lastLoad: number;
  private _items: Array<any>;
  private _listeners: Array<{ id: idType; action: Function }>;

  constructor() {
    this._items = [];
    this._lastLoad = 0;
    this._loaded = false;
    this._listeners = [];
    this.query = this.query.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  get listeners() {
    return this._listeners;
  }
  addListener = (id: idType, action: () => void) => {
    const find = this._listeners.find((l) => l.id === id);
    if (find) {
      find.action = action;
    } else {
      this._listeners.push({ id, action });
    }
  };

  async loadData() {
    if (this._loaded && this.compareTimes()) {
      return this._loaded;
    }
    this._items = await this.query();
    this._loaded = true;
    this.updateListeners();
    this.updateActionRequire();
    return this._loaded;
  }

  updateActionRequire = () => {

  }

  updateListeners = () => {
    if (!this._listeners.length) {
      return;
    }
    try {
      this._listeners.forEach((l) => {
        try {
          l.action();
        } catch (e) {
          // console.error('e')
        }
      });
    } catch (e) {
      // console.error("error")
    }
  };

  compareTimes = () => {
    const time = Math.round(new Date().getTime() / 1000);
    if (time > this._lastLoad + 60 * 30) {
      this._lastLoad = time;
      return false;
    } else {
      return true;
    }
  };

  async query(): Promise<Array<any>> {
    throw new Error("Query doesn't set");
  }

  get items() {
    return this._items;
  }

  get loaded() {
    return this._loaded;
  }

  get selectOptions(): Array<any> {
    return [];
  }
}

export { Dictionary };
