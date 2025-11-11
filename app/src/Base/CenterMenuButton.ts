import { MenuButton, menuButtonModel } from './MenuButton';

class CenterMenuButton extends MenuButton {
  private _isEmpty: boolean;
  constructor(model: menuButtonModel) {
    super(model);
    this._isEmpty = true;
  }

  get isEmpty() {
    return this._isEmpty;
  }
  public get isCenter() {
    return true;
  }

  setIsSelected = (bool: boolean, update: boolean = true) => {
    if (this.isSelected === bool) {
      return;
    }
    this.isSelected = bool;
    try {
      if (bool) {
        this.ref.open();
      } else {
        this.ref.close();
      }
      if (update) {
        this.updateMe();
      }
    } catch (e) {}
  };

  setIsEmpty = (bool: boolean, update: boolean = true) => {
    if (this._isEmpty === bool) {
      return;
    }
    this._isEmpty = bool;
    if (update) {
      this.updateMe();
    }
  };
  toggleTrucked = () => {
    this.setIsEmpty(!this._isEmpty);
  };

  get icon(): any {
    const icon = this.getIconArr();
    // return this.isSelected ? icon.selected : icon.simple
    return icon.selected;
  }

  getIconArr = (): { simple: any; selected: any } => {
    return this._isEmpty ? this.model.icon.empty : this.model.icon.full;
  };
}

export { CenterMenuButton };
