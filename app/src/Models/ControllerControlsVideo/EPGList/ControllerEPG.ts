import {Model} from "~/src/Base/Model";
import {EpgModel} from "~/src/Controllers/Pages/HomeStack/IptvPage/EpgModel";

export class ControllerEPG extends Model {
  public isVisible = false;
  private _epgModel: EpgModel = new EpgModel();
    private readonly _callback: () => void;
  constructor(callback: () => void) {
    super();
      this._callback = callback;
  }

  public get epgModel() {
    return this._epgModel;
  }
  public show = (callBack?: (() => any) | undefined) => {
    this.isVisible = true;
    this.updateMe().then(() => {
      callBack && callBack();
    });
  };

  public hide = (callBack?: (() => any) | undefined) => {
      try {
          callBack && callBack();
          this._callback && this._callback();
          this.isVisible = false;
          this.updateMe();
      }catch (e) {
          console.log('error while hide', e);
      }
  };
}
