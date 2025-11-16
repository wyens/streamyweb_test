import {Model} from "~/src/Base/Model";
import {EpgModel} from "~/src/Controllers/Pages/HomeStack/IptvPage/EpgModel";
import type {ControllerControlsVideo} from "~/src/Models/ControllerControlsVideo/ControllerControlsVideo";

export class ControllerEPG extends Model {
  public isVisible = false;
  private _epgModel: EpgModel = new EpgModel();
  private readonly _controls: ControllerControlsVideo
  constructor(controls: ControllerControlsVideo) {
    super();
      this._controls = controls
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
          this.isVisible = false;
          this.updateMe();
          this._controls.hideControllers(true)
      }catch (e) {
          console.log('error while hide', e);
      }
  };

}
