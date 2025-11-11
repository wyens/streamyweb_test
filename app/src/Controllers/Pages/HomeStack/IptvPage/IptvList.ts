import {List} from "~/src/Models/List/List";
import type {OneCategory} from "~/src/Controllers/Pages/MainPage/MainCategory/OneCategory";
import {controllers} from "~/src/Controllers/Controllers";
import {loadData, UserDataProvider} from "~/src/Base/UserDataProvider";
import type {channelItemProps} from "~/src/DataTypes/BaseTypes";
import {IptvChannel} from "~/src/Controllers/Pages/HomeStack/IptvPage/IptvChannel";


class IptvList extends List {

    private _onLoadedThumbnail: any
    private _selectedCategory: any;
    private _channelSlots:any = null;
    private _maxItemsToLoad: number = 4;


    setMaxItemsToLoad = (num: number) => {
        this._maxItemsToLoad = num
    }
    get maxItemsToLoad(){
        return this._maxItemsToLoad
    }
    
    initChannelSlots = (slotItems: any) => {
        this._channelSlots = slotItems.slice(1)
    }

    get slots(){
        return this._channelSlots
    }

    setSelectedCategory(category:OneCategory){
        this._selectedCategory = category
        this.loadWithParams({category_id: this._selectedCategory.id})
    }
    setOnLoadedThumbnail = (_func:any) => {
        this._onLoadedThumbnail = _func
    }
    
    onLoadedThumbnail = (channel: any) =>{ 
        if(this._onLoadedThumbnail){
            this._onLoadedThumbnail(channel)
        }
    }

    
    query = async (params?: any, pageIndex: number = 0, pageSize: number = this.pageSize): Promise<Array<IptvChannel>> => {
        
        const body:any = {
            pageIndex,
            pageSize,
            userToken: controllers().auth.userToken,
        }
        if(this._selectedCategory && this._selectedCategory.genre != "all"){
            body['category_id'] = this._selectedCategory.id
        }
        controllers().abortControl.abortAll()
        console.log("BODY", {...params, ...body})
        const response = await loadData(UserDataProvider.listChannels, {...params, ...body})
        console.log("RESPONSE", response)
        if(response.statusCode !== 200){
            return []
        }
        const data:Array<channelItemProps> = response.data
        console.log("response", data)
        return data && data.map(item=>new IptvChannel({...item, id: item.streamchannel_id, list: this}))
    };

    get localitems():Array<IptvChannel>{
        // @ts-ignore
        return this.items
    }

    sortItems = () => {
        return
        const currentCategory = this._selectedCategory.genre
        this.localitems.forEach((oi:IptvChannel)=>{
            oi.setVisible((!currentCategory || currentCategory=="all") || oi.channelCategory == this._selectedCategory.genre)
        })
    }

    // get items():Array<any>{
    //     return this.sortedItems
    // }
}

export { IptvList }