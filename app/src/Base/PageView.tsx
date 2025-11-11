import { PageModel } from './PageModel';
import { ViewItem } from './ViewItem';

class PageView extends ViewItem {
  _controller: PageModel | null;
  private _onFocusListeter: any;
  private _onBlurListeter: any;
  private _listenersSet: boolean = false;
  constructor(props: any) {
    super(props);
    this._controller = null;
    this._onFocusListeter = null;
    this._onBlurListeter = null;
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  get controller(): PageModel | null {
    return this._controller;
  }
  set controller(con) {
    this._controller = con;
  }
  componentDidMount() {
    this.controller?.pageMounted();
    this.checkNavigationMounted();
    this.onFocus();
  }
  checkNavigationMounted = () => {
    // const { handle, navigationMounted} = navigator()
    // if(!navigationMounted){
    //     handle.append(this.setListeners)
    //     return
    // }
    setTimeout(this.setListeners, 100);
  };
  setListeners = () => {
    this._onFocusListeter = this.props.navigation.addListener('focus', this.onFocus);
    this._onBlurListeter = this.props.navigation.addListener('blur', this.onBlur);
    this._listenersSet = true;
  };
  componentWillUnmount() {
    if (this._onFocusListeter !== null) {
      this._onFocusListeter();
      this._onBlurListeter();
    }
  }
  onFocus() {
    this.controller?.pageFocus();
  }
  onBlur() {
    this.controller?.pageBlur();
  }
}

export { PageView };
