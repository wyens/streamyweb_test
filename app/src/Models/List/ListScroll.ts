import { ScrollController } from '../ScrollController';
import { ScrollRefresh } from './ScrollRefresh';

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
  constructor(model: listScrollModel) {
    super(model);
    this._customModel = model
    this._listScrollModel = model;
    this._scrollRefresh = new ScrollRefresh(model.refresh);
  }

  onScrollHorizontal = (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent
    // const {y, height} = event.nativeEvent.contentOffset
    const pos = contentOffset.x
    if(this._customModel.onScrollHorizontal){
        this._customModel.onScrollHorizontal(pos)
    }
  }

  get horizontal(){
    return this._listScrollModel.horizontal
  }

  get scrollRefresh() {
    return this._scrollRefresh;
  }
  get pagingEnabled(){
    return this._listScrollModel.pagingEnabled
  }
}

export { ListScroll };
