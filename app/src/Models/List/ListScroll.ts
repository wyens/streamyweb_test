import { ScrollController } from '../ScrollController';
import { ScrollRefresh } from './ScrollRefresh';
import React from "react";

type listScrollModel = {
  refresh: (callback: () => void) => Promise<any>;
  onScroll?: (e: any) => void;
  onScrollHorizontal?: (pos: number)=>void;
  horizontal?: boolean;
  pagingEnabled?: boolean
};
class ListScroll extends ScrollController {
  private _scrollRefresh: ScrollRefresh;
  private _listScrollModel: listScrollModel;
  private _customModel: listScrollModel|any;
    public _innerRef = null;
  constructor(model: listScrollModel) {
    super(model);
    this._customModel = model
    this._listScrollModel = model;
    this._scrollRefresh = new ScrollRefresh(model.refresh);
  }

    onScrollHorizontal = (event: any) => {
        const target = event.currentTarget as HTMLDivElement;
        if (!target) return;

        const pos = target.scrollLeft;

        if (this._customModel.onScrollHorizontal) {
            this._customModel.onScrollHorizontal(pos);
        }
    };

  get horizontal(){
    return this._listScrollModel.horizontal
  }

  get scrollRefresh() {
    return this._scrollRefresh;
  }
  get pagingEnabled(){
    return this._listScrollModel.pagingEnabled
  }
    get innerRef() {
        return this._innerRef;
    }
    setInnerRef = (ref) => {
        this._innerRef = ref;
    };
    syncScrollFromHeader = (scrollLeft: number) => {

        if (this._innerRef && this._innerRef.scrollLeft !== scrollLeft) {
            this._innerRef.scrollLeft = scrollLeft;
        }
    };
}

export { ListScroll };
