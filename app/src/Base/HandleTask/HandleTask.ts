import { Listener } from './Listener';

class HandleTask {
  private _activity: Array<Listener>;
  private _working: boolean;

  constructor() {
    this._activity = [];
    this._working = false;
  }

  append = (doing: () => void, name: string = 'somename', priority: number = 0) => {
    this._activity.push(new Listener({ doing, name, priority }));
  };

  do = async () => {
    if (this._working) {
      return;
    }
    this._working = true;
    for (const listener of this._activity) {
      await listener.do();
    }
    this.clear();
    this._working = false;
  };

  clear = () => {
    this._activity = [];
  };
}

export { HandleTask };
