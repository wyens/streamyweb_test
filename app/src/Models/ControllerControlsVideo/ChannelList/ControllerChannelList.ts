import {Model} from "~/src/Base/Model";
import {IptvList} from "~/src/Controllers/Pages/HomeStack/IptvPage/IptvList";
import type {ControllerControlsVideo} from "~/src/Models/ControllerControlsVideo/ControllerControlsVideo";
import {controllers} from "~/src/Controllers/Controllers";
import type {IptvChannel} from "~/src/Controllers/Pages/HomeStack/IptvPage/IptvChannel";


export class ControllerChannelList extends Model {
  public isVisible = false;
  // public opacity = new Animated.Value(0);
  private readonly _iptvList: IptvList;
  private _selectedCategory: any
  private _controls: ControllerControlsVideo
  private _categoryFocusRef: any

  constructor(controls: ControllerControlsVideo) {
    super();
    this._controls = controls
    this._iptvList = new IptvList({
      id: 'iptvList',
      afterLoad: this.afterLoadChannels,
      onPressItem: this.onChannelSelected,
      firstLoadSize: 6
      // onScrollVertical: this.onVerticalScroll,
      // onScrollHorizontal: this.onHorizontalScroll,
    });
  }
  public get iptvList() {
    return this._iptvList;
  }
  public show = (callBack?: (() => any) | undefined) => {
    this.isVisible = true;
    this.updateMe().then(() => {
      callBack && callBack();
    });

    // Animated.timing(this.opacity, {
    //   toValue: 1,
    //   duration: 200,
    //   useNativeDriver: true,
    // }).start(() => {});

    const selectedNow = controllers().main.videoPlayerPage.initialChannel
    this._iptvList.loadData({selected_channel_hash: selectedNow?.channelHash}).then();
  };

  public hide = (callBack?: (() => any) | undefined) => {
      callBack && callBack();
      this.isVisible = false;
      this.updateMe();
    // Animated.timing(this.opacity, {
    //   toValue: 0,
    //   duration: 200,
    //   useNativeDriver: true,
    // }).start(() => {
    //   callBack && callBack();
    //   this.isVisible = false;
    //   this.updateMe();
    //   // if(this._controls){
    //   //   this._controls!.updateMe()
    //   // }
    // });
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
    // console.error("SELECTED CATEGORY", this._selectedCategory)
    this._iptvList.setSelectedCategory(category)
  }

  afterLoadChannels = () => {
    // console.log("SELECTED", this._iptvList.localitems.find(oi=>oi.selected))
    const selected = this._iptvList.localitems.find(oi=>oi.selected)
    if(!selected && this._iptvList.localitems.length){
      this._iptvList.localitems[0].setSelected(true)
    }
    const find = this._iptvList.localitems.find((oc) => !oc.thumbnail);
    find?.generateThumbnail();
    // this.updateMe()
  };
  onChannelSelected = (channel: IptvChannel) => {
    const find = this._iptvList.localitems.find((ip) => ip.selected);
    if (find) {
      find.setSelected(false);
    }
    channel.setSelected(true);
    this.hide(()=>{
      this._controls.hideControllers(true)
      // this._controls.timer.start()
      // this._controls.updateMe()
    })
    // this._bPlayer.loadLiveChannel(channel.channelHash);
    // this._epgModel.updateMe();
  };
  onVerticalScroll = (pos: number) => {
    // this.increaseMaxLimit(pos);
    // this._iptvListChannelNames.scroll.scrollY(pos);
  };

  onHorizontalScroll = (pos: number) => {};
}
