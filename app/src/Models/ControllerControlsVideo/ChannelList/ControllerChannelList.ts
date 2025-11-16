import {Model} from "~/src/Base/Model";
import {IptvList} from "~/src/Controllers/Pages/HomeStack/IptvPage/IptvList";
import type {ControllerControlsVideo} from "~/src/Models/ControllerControlsVideo/ControllerControlsVideo";
import {controllers} from "~/src/Controllers/Controllers";
import type {IptvChannel} from "~/src/Controllers/Pages/HomeStack/IptvPage/IptvChannel";


export class ControllerChannelList extends Model {
  public isVisible = false;
  private readonly _iptvList: IptvList;
  private _selectedCategory: any
  private readonly _controls: ControllerControlsVideo
  private _categoryFocusRef: any

  constructor(controls: ControllerControlsVideo) {
    super();
    this._controls = controls
    this._iptvList = new IptvList({
      id: 'iptvList',
      afterLoad: this.afterLoadChannels,
      onPressItem: this.onChannelSelected,
      firstLoadSize: 6
    });
  }
  public get iptvList() {
    return this._iptvList;
  }
  public get controls(){
      return this._controls
    }
  public show = (callBack?: (() => any) | undefined) => {
    this.isVisible = true;
    this.updateMe().then(() => {
      callBack && callBack();
    });
    const selectedNow = controllers().main.videoPlayerPage.initialChannel
    this._iptvList.loadData({selected_channel_hash: selectedNow?.channelHash}).then();
  };

  public hide = (callBack?: (() => any) | undefined) => {
      callBack && callBack();
      this.isVisible = false;
      this.updateMe();
  };


  get categoryFocusRef(){
    return this._categoryFocusRef
  }
  setCategoryFocusRef = (ref:any) =>{
    this._categoryFocusRef = ref
  }
  get selectedItemFromList(){
    return this._iptvList.localitems.find(oi=>oi.selected)
  }

  get selectedCategory(){
    return this._selectedCategory
  }

  onCategoryChanged = (category: any) => {
    this._selectedCategory = category
    this._iptvList.setSelectedCategory(category)
  }

  afterLoadChannels = () => {
    const selected = this._iptvList.localitems.find(oi=>oi.selected)
    if(!selected && this._iptvList.localitems.length){
      this._iptvList.localitems[0].setSelected(true)
    }
    const find = this._iptvList.localitems.find((oc) => !oc.thumbnail);
    find?.generateThumbnail();
  };
  onChannelSelected = (channel: IptvChannel) => {
    const find = this._iptvList.localitems.find((ip) => ip.selected);
    if (find) {
      find.setSelected(false);
    }
    channel.setSelected(true);
    this.hide(()=>{
      this._controls.hideControllers(true)
    })
  };
}
