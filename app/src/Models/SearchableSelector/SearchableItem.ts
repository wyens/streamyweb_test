import type {idType} from '../../DataTypes/BaseTypes';
import { List } from '../List/List';
import { ListItem } from '../List/ListItem';

type searchableItemModel = {
  id: idType;
  list?: List;
  label: string;
  value: idType;
  icon?: any;
  selected?: boolean;
};

class SearchableItem extends ListItem {
  private _data: searchableItemModel;
  private _selected: boolean;
  constructor(model: searchableItemModel) {
    super(model);
    this._data = model;
    this._selected = model.selected || false;
  }

  get data() {
    return this._data;
  }

  get selected() {
    return this._selected;
  }

  setSelected = (bool: boolean) => {
    if (this._selected === bool) {
      return;
    }
    this._selected = bool;
    this.updateMe();
  };

  get label() {
    return this._data.label;
  }

  get value() {
    return this._data.value;
  }

  get icon() {
    return this._data.icon
  }

  onPress = () => {
    if (this._data.list) {
      this._data.list.onPressItem(this);
    }
  };
  onPressRemove = () => {
    this.setSelected(false);
    if (this._data.list) {
      this._data.list.onPressItem(this);
    }
  };
  onPressSelect = () => {
    if (this._selected) {
      this.onPressRemove();
    } else {
      this.setSelected(true);
    }
    if (this._data.list) {
      this._data.list.onPressItem(this);
    }
  };
}

export { SearchableItem };
