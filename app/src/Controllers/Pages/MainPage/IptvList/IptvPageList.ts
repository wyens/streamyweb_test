import {Model} from "~/src/Base/Model";
import  {IptvList} from "~/src/Controllers/Pages/HomeStack/IptvPage/IptvList";
import  {IptvHeader} from "~/src/Controllers/Pages/MainPage/IptvList/IptvHeader";
import  {EpgModel} from "~/src/Controllers/Pages/HomeStack/IptvPage/EpgModel";
import  {Slots} from "~/src/Controllers/Pages/HomeStack/IptvPage/Slots";
import {LISTSIZE, PRELOAD_ITEMS_FROM_COUNT} from "~/src/Constants/settings";
import {IptvChannel} from "~/src/Controllers/Pages/HomeStack/IptvPage/IptvChannel";
import {DISTANCE_BETWEEN_ITEMS} from "~/src/ViewsNew/MainListPage/Components/Iptvs/IptvHeaderRow";
import React from "react";


type iptvPageListModel = {
  listLoaded?: ()=>void
  control?: any
}
class IptvPageList extends Model {
  private readonly _iptvList: IptvList;
  private readonly _iptvHeader: IptvHeader;
  private readonly _epgModel: EpgModel;
  private readonly _headerSlots: Slots
  private _model: iptvPageListModel

  private _maxItemsThumbnail: number = LISTSIZE;
  private _epgCountToLoad: number = 4;

  private _channelToLoad:any = null;
  constructor(model:iptvPageListModel) {
    super();
    this._model = model
    this._headerSlots = new Slots()
    this._headerSlots.initHeaderSlots()
    this._iptvList = new IptvList({ id: 'iptvList', firstLoadSize: 8, afterLoad: this.afterLoadChannels, onPressItem: this.onChannelSelected, onScrollVertical: this.onVerticalScroll, onScrollHorizontal: this.onHorizontalScroll, control: this._model.control});
    this._iptvList.initChannelSlots(this._headerSlots.items)
    this._epgModel = new EpgModel();
    this._epgModel.addonsOnUpdate(this.updateTimes)
    this._iptvList.setOnLoadedThumbnail(this.onLoadedThumbnail)
    this._iptvHeader = new IptvHeader();
    this._iptvHeader.setTimeSlots(this._headerSlots.items)
    this._iptvHeader.setOnScroll(this.onHeaderScroll)
  }

  setEpgCountToLoad = () => {
    this._epgCountToLoad = 4
    this._maxItemsThumbnail = LISTSIZE
  }

  afterLoadChannels = () => { 
    if(this._model.listLoaded){
      this._model.listLoaded()
    }
    this._maxItemsThumbnail += 12
    const find = this._iptvList.localitems.find(oc=>!oc.thumbnail)
    find?.generateThumbnail()
  }

  get timeSlots(){
    return this._iptvHeader.timeSlots
  }

  get headerSlots(){
    return this._headerSlots
  }
  // currentTimeStamp == 1760151900
  updateTimes = (currentTimeStamp: any) => {
    
    // Check if timestamp is at a 30-minute mark (0 or 30 minutes past the hour)
    // 1800 seconds = 30 minutes
    const isThirtyMinuteMark = (currentTimeStamp % 1800) === 0
    
    // 5 minutes mark
    // const isThirtyMinuteMark = (currentTimeStamp % 300) === 0
    
    // console.error("currentTimeStamp", currentTimeStamp, isThirtyMinuteMark)
    if(isThirtyMinuteMark) {
      this._headerSlots.initHeaderSlots()
      this._iptvHeader.setTimeSlots(this._headerSlots.items)
      this._iptvHeader.updateMe()
      this._iptvList.initChannelSlots(this._headerSlots.items)
      this._iptvList.localitems.forEach(oi => {
        if(oi.channelSlots){
          oi.channelSlots.items=this._headerSlots.items
          oi.channelSlots.generateChannelSlots()
          oi.updateMe()
        }
      })
    } else {
      this._headerSlots.updateFirstItem()
      this._iptvHeader.updateMe()
    }
  }

  onLoadedThumbnail = (channel: IptvChannel) => { 
    const findIndex = this._iptvList.items.findIndex(oi=>oi.id === channel.id)
    if(findIndex>this._maxItemsThumbnail){
        // console.error("maxIndex reached")
        this._channelToLoad = channel
        return
    }
    // console.error("Find current index", findIndex)
    const nextItem = this._iptvList.localitems[findIndex+1]
    if(nextItem){
        nextItem!.generateThumbnail()
    }
  }

  // increaseMaxLimit = (pos:number) => {
  //   const screenHeight = Dimensions.get("screen").height
  //   const oneItemHeight = screenHeight*.2-DISTANCE_BETWEEN_ITEMS
  //   if(pos > oneItemHeight*this._maxItemsThumbnail){
  //       // console.log("need to increase", pos, oneItemHeight*this._maxItemsThumbnail - screenHeight)
  //       this._maxItemsThumbnail += 12
  //       this._channelToLoad.generateThumbnail()
  //   } else {
  //       // console.log("we're good")
  //   }
  // }

  onVerticalScroll = (pos: number) => {
    // this.increaseMaxLimit(pos)
    // const namesRef = this._savedScrollRef || this._iptvList.getSecondRef("channel_names")
    // console.log("namesRef",namesRef)
    // if(namesRef){
        // console.log("namesRefSCroll",namesRef.scrollRef)
        // console.log("namesRefSCrollREF",namesRef.scroll.ref)
        // namesRef.scroll.scrollY(pos)
        // this._iptvListChannelNames.scroll.scrollY(pos)
        // const scrollRef = namesRef.scrollRef
        // this._savedScrollRef = scrollRef
        // if(scrollRef === null){
        //     return
        // }
        // if(scrollRef.scrollTo){
        //     scrollRef.scrollTo({
        //         x: 0,
        //         y: pos,
        //         animated: false
        //     })
        // }
    // }
  }

  onHorizontalScroll = (pos: number) => {
    this._iptvHeader.scrollHorizontally(pos)
    const oneItemWidth = window.innerWidth *.2+DISTANCE_BETWEEN_ITEMS
    const currentMax = this._epgCountToLoad - PRELOAD_ITEMS_FROM_COUNT
    if(pos>currentMax*oneItemWidth){
      this._epgCountToLoad += 5;
      this._iptvList.setMaxItemsToLoad(this._epgCountToLoad)
      this._iptvList.localitems.forEach(oi=>{
        oi.channelSlots!.loadNext()
      })
    }
  }

  get iptvList() {
    return this._iptvList;
  }

  get iptvHeader() {
    return this._iptvHeader;
  }
  get selectedChannel() {
    return this._iptvList.localitems.find((iptv) => iptv.selected);
  }

  get epgModel(){
    return this._epgModel
  }

  onChannelSelected = (channel: IptvChannel) => {
    const find = this._iptvList.localitems.find((ip) => ip.selected);
    if (find) {
      find.setSelected(false);
    }
    channel.setSelected(true);
    // this._bPlayer.loadLiveChannel(channel.channelHash);
    // this._epgModel.updateMe();
  };

    public onHeaderScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget as HTMLDivElement;
        this._iptvList.scroll.syncScrollFromHeader(el.scrollLeft)
    };
}

export { IptvPageList };
