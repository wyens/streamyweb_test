import { controllers } from '../Controllers/Controllers';
import { navigator } from '../Controllers/Navigation';
import { Model } from './Model';

class PageModel extends Model {
  private readonly _pageName: string;
  private _showMenu: boolean = true
  constructor(pageName: string) {
    super();
    this._pageName = pageName;
    this.pageMounted = this.pageMounted.bind(this);
  }

  get showMenu(){
    return this._showMenu
  }

  set showMenu(val){
    this._showMenu = val
  }

  get pageName() {
    return this._pageName;
  }

  pageMounted = () => {};
  pageFocus = () => {
    navigator().focusScreen(this._pageName)
    controllers().main.menu.setVisible(this._showMenu)
    this.onFocus()
  };
  pageBlur = () => {
    this.onBlur()
  };
  willUnmount = () => {};
  onFocus = () => {}
  onBlur = () => {}
}

export { PageModel };
