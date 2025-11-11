import { HandleTask } from './HandleTask/HandleTask';

class Model {
  private _ref: any;
  private _referenceHandler: HandleTask;
  constructor() {
    this._referenceHandler = new HandleTask();
    this._ref = null;
    this.set = this.set.bind(this);
    this.updateMe = this.updateMe.bind(this);
  }

  set(ref: any) {
    this._ref = ref;
    this._referenceHandler.do();
  }

  async updateMe() {
    try {
      if (this._ref == null) {
        return
      //   return this._referenceHandler.append(this.updateMe);
      }
      this._ref.update();
    } catch (e) {
      console.log('ref doesnt set', e);
    }
  }

  get ref() {
    return this._ref;
  }
}

export { Model };
