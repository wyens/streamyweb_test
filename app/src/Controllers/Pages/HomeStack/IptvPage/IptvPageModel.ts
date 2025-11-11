import { Model } from "../../../../Base/Model";
import { BPlayer } from "../../../../Models/BPlayer/BPlayer";
import { SwitchPager } from "../../../../Models/Switcher/SwitchPager";
import { Switcher } from "../../../../Models/Switcher/Switcher";
import { controllers } from "../../../Controllers";
import { navigator } from "../../../Navigation";
import { EpgModel } from "./EpgModel";
import { IptvChannel } from "./IptvChannel";
import { IptvList } from "./IptvList";

export type hometabs = "list"|"epg"

class IptvPageModel extends Model {

    private _bPlayer: BPlayer = new BPlayer;
    private _iptvList: IptvList;
    private _epgModel: EpgModel = new EpgModel()
    private _switch: Switcher;
    private _pager: SwitchPager;
    private _currentType: hometabs = "list"
    constructor(){
        super()
        this._iptvList = new IptvList({pageSize: 9999, onPressItem: this.onChannelSelected})
        this._switch = new Switcher(this)
        this._pager = new SwitchPager(this)
    }

    get selectedChannel(){
        return this._iptvList.localitems.find(iptv=>iptv.selected)
      }

      onChannelSelected = (channel: IptvChannel) => {
        if(navigator().currentScreen!=="Home"){
          navigator().navigate("Home")
        }
        const find = this._iptvList.localitems.find(ip=>ip.selected)
        if(find){
          find.setSelected(false)
        }
        channel.setSelected(true)
        const findSelectedIndex = this._iptvList.localitems.findIndex(ip=>ip.selected)
        if(findSelectedIndex>6){
          // this._iptvList.scroll.scroll(channel.offsetTop - controllers().media.h*0.7)
        }
        console.log('channel', channel)
        this._bPlayer.loadLiveChannel(channel.channelHash)
        this._epgModel.updateMe()
    }

    get epg(){
      return this._epgModel
    }
    get bPlayer(){
        return this._bPlayer
    }

    get iptvList(){
        return this._iptvList
    }

    get currentType(){
      return this._currentType
    }


    chooseType = (type: hometabs) => {
        if(this._currentType === type){
            return
        }
        this._currentType = type
        this._pager.updateMe()
    }

    get switcher(){
      return this._switch
    }
    get pager(){
      return this._pager
    }
}

export { IptvPageModel }
