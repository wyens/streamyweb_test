import type {channelItemProps} from "~/src/DataTypes/BaseTypes";
import { ListItem } from "~/src/Models/List/ListItem";
import { ChannelSlots } from "./ChannelSlots";
import { EpgList } from "./EpgList";

class IptvChannel extends ListItem {
    private _data: channelItemProps
    private _selected: boolean = false;
    private _domRef: any = null;
    private _epg: EpgList
    private _thumbnail:any = null;
    private _timeSlots:Array<any> = []
    private _channelSlots: ChannelSlots | null = null
    private _leftRef: any
    private _focusRefItem: any;
    private _isMainTypeFocused: boolean = false

    constructor(model: channelItemProps){
        super(model)
        this.model = model
        this._data = model
        this._selected = model.selected || false
        this._epg = new EpgList(this._data?.stream_epg, this._data.stream_timezone)
        if(model?.list?.slots){
            // console.error("ChannelSlots", this._epg.items)
            this._channelSlots = new ChannelSlots({items: model?.list?.slots, channelEpgItems: this._epg.items, channel: this, currentMaxItemsToLoad: model.list.maxItemsToLoad })
        }
    }

    get focusRefItem(){
        return this._focusRefItem
    }

    setFocusItem = (ref:any) => {
        this._focusRefItem = ref
        // controllers().main.videoPlayerPage.bPlayer.videoControls.controllerChannelList.updateMe()
    }

    updateMe = async () => {
        try {
            if (this.ref == null) {
                return
            //   return this._referenceHandler.append(this.updateMe);
            }
            this.ref.update();
            if(this._leftRef && this._leftRef.update){
                this._leftRef.update();
            }
        } catch (e) {
        console.log('ref doesnt set', e);
        }
    }

    get isMainTypeFocused(){
        return this._isMainTypeFocused
    }

    focusedType = (isMainTypeFocused: boolean=false) =>{ 
        // console.error("FOCUSED TYPE", isMainTypeFocused)
        this._isMainTypeFocused = isMainTypeFocused
    }
    setLeftRef = (ref:any) => {
        this._leftRef = ref
    }

    get leftRef(){
        return this._leftRef
    }

    get channelSlots(){
        return this._channelSlots
    }

    get data() {
        return this._data
    }

    get id(){
        return this._data.id
    }

    get categoryId(){
        return this._data.category_id
    }

    get icon(){
        return this._data.stream_icon
    }

    get title(){
        return this._data.channel_name
    }

    get channelCategory(){
        return this._data.category_name
    }
    
    get channelHash(){
        return this._data.channel_hash
    }

    get selected(){
        return this._selected
    }

    get epg(){
        return this._epg
    }

    get timeSlots(){
        return this._timeSlots
    }

    get favoriteStatus(){
        return this._data.favoritesStatus
    }

    setFavoriteSelected = (bool: boolean) =>{
        this._data.favoritesStatus = bool
        this.updateMe()
    }

    setThumbnail = (image: any) => {
        this._thumbnail = image
        this.updateMe()
    }

    get thumbnail(){
        return this._thumbnail
    }

    onLoadedThumbnail = () => { 
        if(this._data.list.onLoadedThumbnail){
            this._data.list.onLoadedThumbnail(this)
        }
    }

    generateThumbnail = async () => {
        // const videoUrl = await this.loadLive();
        this.setThumbnail("somepath")
        // try {
        //     console.error("VIDEOURL", videoUrl)
        //     const response = await createThumbnail({
        //         url: videoUrl,
        //         timeStamp: 1000, // Get frame at 1 second
        //     });
        //     console.error("thumbnail", response)
        //     this.setThumbnail(response.path);
        // } catch (err) {
        //     console.error("Thumbnail ERROR",err);
        // }
    };

    setSelected = (bool : boolean) => {
        if(this._selected === bool){
            return
        }
        this._selected = bool
        this.updateMe()
    }

    setDomRef = (e: any) => {
        this._domRef = e
    }

    get offsetTop(){
        if(!this._domRef){
            return 0
        }
        return this._domRef.offsetTop
    }

    onPressItem = () => {
        if(this._data.list.onPressItem){
            this._data.list.onPressItem(this)
        }
    }


    get selectedEpg(){
        return this._epg?.selectedItem
    }

    get nextEpg(){
        const findIndex = this._epg?.items.findIndex(epg=>epg.selected)
        // console.log("EPG ITEMS", this.epg.items)
        // console.log("EPG ITEMS FINDINDEX", findIndex)
        if(findIndex){
            return this._epg?.items[findIndex+1]
        }
        return null
    }

}

export { IptvChannel }