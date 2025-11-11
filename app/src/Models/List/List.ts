import { Model } from '../../Base/Model';
import { LISTSIZE, SCROLLUPDATELENGTH } from '../../Constants/settings';
import type {idType} from '../../DataTypes/BaseTypes';
import { makeid } from '../../Helpers/actions';
import { Input } from '../../Views/Components/InputItem';
import { ListItem } from './ListItem';
import { ListScroll } from './ListScroll';

export type listModel = {
  id?: idType;
  title?: string;
  pageSize?: number;
  onPressItem?: (item: any) => void;
  afterLoad?: () => void;
  endLoading?: boolean;
  selectable?: boolean;
  horizontal?: boolean;
  pagingEnabled?:boolean;
  onScrollVertical?:(pos: number)=>void;
  onScrollHorizontal?:(pos: number)=>void
  firstLoadSize?:number;
  control?:any
};

class List extends Model {
  private _model: listModel;
  private _id: idType;
  private _items: Array<ListItem>;
  private _pageIndex: number;
  private _pageSize: number;
  private _lastupdate: number = 0;
  private _scroll: ListScroll;
  private _loaderRef: any;
  private _isLoading: boolean;
  private _endLoading: boolean;
  private _needToUpdate: boolean;
  private _firstLoad: boolean;
  private _doNotTrackTheScroll: boolean;
  private _canDoUpdate: boolean;
  private _isRefreshNow: boolean;
  private _sQuery: idType | Input;
  private _isEmpty: boolean;
  private _params: any;
  private _title: string | undefined;
  private _needInit: boolean = false;
  private _inited: boolean = false;

  constructor(model: listModel) {
    super();
    this._model = model;
    this._title = model.title;
    this._items = [];
    this._id = model.id || makeid(16);
    this._pageIndex = 0;
    this._pageSize = model.firstLoadSize ? model.firstLoadSize : model.pageSize || LISTSIZE;
    this._scroll = new ListScroll({ refresh: this.refresh, onScroll: this.onScroll, onScrollHorizontal: this.onScrollHorizontalAction, horizontal: model.horizontal, pagingEnabled: model.pagingEnabled });
    this._endLoading = false;
    this._needToUpdate = false;
    this._isLoading = true;
    this._firstLoad = true;
    this._doNotTrackTheScroll = false;
    this._canDoUpdate = false;
    this._isRefreshNow = false;
    this._loaderRef = null;
    this._sQuery = '';
    this._isEmpty = false;
    this._params = {};
  }

  get control(){
    return this._model.control
  }

  get horizontal(){
    return this._model.horizontal
  }

  get model() {
    return this._model;
  }

  get selectable() {
    return this._model.selectable;
  }
  set selectable(val) {
    this._model.selectable = val;
  }

  get title() {
    return this._title;
  }
  setTitle = (title: string) => {
    if (this._title === title) {
      return;
    }
    this._title = title;
    this.updateMe();
  };

  get loader() {
    return this._loaderRef;
  }
  loaderRef = (ref: any) => {
    this._loaderRef = ref;
  };
  startAnimation = () => {
    if (this._loaderRef === null) {
      return;
    }
    try {
      this._loaderRef.startAnimation();
    } catch (e) {}
  };

  get pageIndex() {
    return this._pageIndex;
  }

  get pageSize() {
    return this._pageSize;
  }
  set pageSize(val){
    this._pageSize = val
  }

  get isLoading() {
    return this._isLoading;
  }
  setIsLoading = (bool: boolean, update: boolean = true) => {
    if (this._isLoading === bool) {
      return;
    }
    this._isLoading = bool;
    if (update) {
      this.needToUpdate();
    }
  };
  setHardLoading = (bool: boolean) => {
    this._isLoading = bool
    this.updateMe()
  }

  needToUpdate = () => {
    this._needToUpdate = true;
  };
  makeUpdate = () => {
    // if (this._firstLoad || (this._needToUpdate)) {
      this.updateMe();
      this.scroll.updateMe();
      this._needToUpdate = false;
      this._firstLoad = false;
    // }
  };
  updateCanDoUpdate = (bool: boolean) => {
    if (this._canDoUpdate === bool) {
      return;
    }
    this._canDoUpdate = bool;
  };
  loadingCanDo = (bool: boolean) => {
    if (this._canDoUpdate) {
      return false;
    }
    this.updateCanDoUpdate(bool);
    this.makeUpdate();
    return !this._needToUpdate;
  };

  get items() {
    return this._items;
  }

  get itemsToSort(){
    return this._items
  }

  get scroll() {
    return this._scroll;
  }

  get id() {
    return this._id;
  }
  get endLoading() {
    return this._model.endLoading || this._endLoading;
  }
  get isEmpty() {
    return this._isEmpty;
  }

  get params() {
    return this._params;
  }

  query = async (params: any = {}, pageIndex: number = this._pageIndex, pageSize: number = this._pageSize): Promise<Array<ListItem>> => {
    throw 500;
  };

  clearEmptiers = () => {
    this._items = this._items.filter(li=>li.emptier!==true)
  }

  loadData = async (params: any = this._params) => {
    // console.log("LOAD DATA", params)
    this._params = params;
    this.clearEmptiers()
    this.setIsEmpty(false);
    const data = await this.query(params, this._pageIndex, this._pageSize);
    this.compareItems(data);
    this.checkEndLoading(data);
    this.checkIsEmpty();
    this.setIsLoading(false);

    this._lastupdate = new Date().getTime();
    this._doNotTrackTheScroll = false;
    if(this._needInit && !this._inited){
      this._inited = true
      this._pageSize = this._model.pageSize || LISTSIZE
    }
    if (this._model.afterLoad) {
      this._model.afterLoad();
    }
    this.makeUpdate();
  };

  compareItems = (items: Array<ListItem>) => {
    const length = this._items.length;
    items.forEach((it) => {
      const find = this._items.find((item) => item.id === it.id);
      if (find) {
        find.update(it.model);
        find.show();
      } else {
        this._items.push(it);
      }
    });
    if (this._pageIndex === 0) {
      this._items.forEach((it) => {
        const find = items.find((item) => item.id == it.id);
        if (!find) {
          // @ts-ignore
          it.hide();
        }
      });
    }
    if (this._items.length !== length) {
      this.needToUpdate();
    }
  };

  checkEndLoading = (data: Array<ListItem>) => {
    if (this._model.endLoading) {
      return;
    }
    if (this._isRefreshNow) {
      return;
    }
    this.setEndLoading(data.length < this._pageSize);
  };

  setEndLoading = (bool: boolean) => {
    if (this._endLoading === bool) {
      return;
    }
    this._endLoading = bool;
    this.needToUpdate();
  };

  checkIsEmpty = () => {
    this.setIsEmpty(this._items.length === 0);
  };

  setIsEmpty = (isEmpty: boolean) => {
    if (this._isEmpty === isEmpty) {
      return;
    }
    this._isEmpty = isEmpty;
    this.needToUpdate();
  };

  onScroll = (event: any) => {
    try {
      const { pos, scrollHeight, contentHeight } = this.scroll;
      this.onScrollVerticalAction(pos)
      if (this._doNotTrackTheScroll || this._endLoading) {
        return;
      }
      if (pos + scrollHeight > contentHeight - SCROLLUPDATELENGTH) {
        this._doNotTrackTheScroll = true;
        this.nextPage();
      }
      // if(this._scroll.pos+this.scroll.scrollHeight
    } catch (e) {
      console.log('No event');
    }
  };

  onScrollVerticalAction = (pos:number) =>{ 
    if(this._model.onScrollVertical){
      this._model.onScrollVertical(pos)
    }
  }

  onScrollHorizontalAction = (pos:number) =>{ 
    if(this._model.onScrollHorizontal){
      this._model.onScrollHorizontal(pos)
    }
  }

  nextPage = () => {
    this._pageIndex = this._pageIndex + 1;
    this.startAnimation();
    this.needToUpdate();
    this.updateCanDoUpdate(false);
    this.loadData();
  };

  refresh = async (callback: () => void) => {
    this._isRefreshNow = true;
    const pageIndex = this._pageIndex;
    const pageSize = this._pageSize;
    this._pageIndex = 0;
    this._pageSize = this._items.length;
    await this.loadData();
    callback();

    this._pageIndex = pageIndex;
    this._pageSize = pageSize;
    this._isRefreshNow = false;
  };

  clearListAndParams = () => {
    this._items = [new ListItem({id: "no-item-1", emptier: true}),new ListItem({id: "no-item-2", emptier: true}),new ListItem({id: "no-item-3", emptier: true}),new ListItem({id: "no-item-4", emptier: true})];
    // this._items = [];
    this._params = {}
    this._canDoUpdate = true;
    this._pageIndex = 0;
    this._scroll.scroll(0)
    this.makeUpdate();
    // this.updateMe();
  }

  clearList = (update: boolean = false) => {
    this._items = [];
    this._canDoUpdate = true;
    if (update) {
      this.updateMe();
    }
  };

  doSearch = async (sQuery: idType | Input) => {
    this.clearList();
    this.setIsLoading(true, true);
    this.makeUpdate();
    this._pageIndex = 0;
    this.needToUpdate();
    this.updateCanDoUpdate(false);
    this._sQuery = sQuery;
    await this.loadData({ ...this._params, sQuery });
  };

  loadWithParams = async (params: any) => {
    this.clearList();
    this.setIsLoading(true, true);
    this.makeUpdate();
    this._pageIndex = 0;
    this.needToUpdate();
    this.updateCanDoUpdate(false);
    await this.loadData({ ...this._params, ...params });
  };

  updateOnPressItem = (func: (item:ListItem)=>void) => {
    this._model.onPressItem = func
  }

  onPressItem = (item: ListItem) => {
    if (this._model.onPressItem) {
      this._model.onPressItem(item);
    }
  };

  get needInit() {
    return this._needInit
  }
  set needInit(val){
    this._needInit = val
  }

  get inited(){
    return this._inited
  }
}

export { List };
