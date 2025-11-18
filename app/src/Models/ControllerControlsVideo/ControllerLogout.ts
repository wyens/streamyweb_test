import {Model} from "~/src/Base/Model";
import {controllers} from "~/src/Controllers/Controllers";
import {coreupdate} from "~/src/Helpers/actions";
import {UPDATE} from "~/src/Helpers/constants";


class ControllerLogout extends Model {
  private _isVisible = false;

  private _duration = 520;

  constructor() {
    super();
  }


  get isVisible() {
    return this._isVisible;
  }

  public showControllers = () => {
    if (this._isVisible) {
      return;
    }
    this._isVisible = true;
    this.updateMe();
  };

  public hideControllers = (immediate: boolean = false): Promise<void> => {
    if (!this._isVisible) {
      return Promise.resolve();
    }
    if (immediate) {
      this._isVisible = false;
      this.updateMe();
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
        this._isVisible = false;
        this.updateMe();
        resolve();
    });
  };

  public removeAllFocus = () => {};

  public onCancel = () => {
    this.hideControllers(true);
  };
  public onConfirm = async () => {
    this.hideControllers(true);
    await controllers().auth.signOut();
    coreupdate(UPDATE.AUTH);
  };
}

export { ControllerLogout };
