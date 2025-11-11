import { idType } from '../DataTypes/BaseTypes';
import { makeid } from '../Helpers/actions';
import { Model } from './Model';
import { CounterModel } from '../Views/Components/Counter/CounterModel';

export type menuButtonModel = {
  id?: idType;
  title?: string;
  icon: any;
  selectedIcon?: any;
  onClick?: (button: MenuButton) => void;
  isSelected?: boolean;
  customButton?: "series";
  pageAnchor: string;
};

class MenuButton extends Model {
  private readonly _model: menuButtonModel;
  private _isSelected: boolean;
  private readonly _id: idType;
  private readonly _counter: CounterModel;

  constructor(model: menuButtonModel) {
    super();
    this._model = model;
    this._id = this._model.id || makeid(16);
    this._isSelected = this._model.isSelected || false;
    this._counter = new CounterModel({ onPress: this.onClick, count: 0 });
  }

  get pageAnchor() {
    return this._model.pageAnchor;
  }
  get counter() {
    return this._counter;
  }
  public set setCounter(value: number) {
    if (this._counter.count === value) {
      return;
    }
    this._counter.count = value;
    this.updateMe();
  }

  get model() {
    return this._model;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._model.title;
  }

  get icon() {
    return this._model.icon;
  }

  get selectedIcon(){
    return this._model.selectedIcon
  }

  onClick = () => {
    if (this._model.onClick) {
      this._model.onClick(this);
    }
  };

  get isSelected() {
    return this._isSelected;
  }
  set isSelected(val) {
    this._isSelected = val;
  }

  setIsSelected = (bool: boolean, update: boolean = true) => {
    if (this._isSelected === bool) {
      return;
    }
    this._isSelected = bool;
    if (update) {
      this.updateMe();
    }
  };

  get customButton() {
    return this._model.customButton;
  }
  public get isCenter() {
    return false;
  }
}

export { MenuButton };
