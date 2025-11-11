import { Model } from '../Base/Model';

class Modal extends Model {
  private _visible: boolean;
  private _title: string;
  constructor(title?: string) {
    super();
    this._title = title || '';
    this._visible = false;
  }
  get title() {
    return this._title;
  }
  set title(title) {
    this._title = title;
  }

  get visible() {
    return this._visible;
  }
  set visible(val){
    this._visible = val
  }

  setVisible = async (bool: boolean) => {
    if (this._visible === bool) {
      return;
    }
    this._visible = bool;
    await this.updateMe();
  };

  show = (some: any = null) => {
    this.setVisible(true);
  };

  hide = () => {
    this.setVisible(false);
  };
}

export { Modal };
