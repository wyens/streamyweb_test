import { HandleTask } from "../Base/HandleTask/HandleTask";
import { coreupdate } from "../Helpers/actions";
import { UPDATE } from "../Helpers/constants";
import { Dictionary } from "./Dictionaries/Dictionary";
import { MovieCategoryDictionary } from "./Dictionaries/MovieCategoryDictionary";

interface T extends Dictionary{};

class Dictionaries {

    private _dicts: Array<T>
    // private _liveCategory: LiveCategoryDictionary;
    // private _movieCategory: MovieCategoryDictionary;
    // private _years: YearsDictionary;
    private _handler: HandleTask;

    constructor(){
        // this._liveCategory = new LiveCategoryDictionary();
        // this._movieCategory = new MovieCategoryDictionary();
        // this._years = new YearsDictionary();
        this._handler = new HandleTask()
        this._dicts = []
        // this._dicts = [this._liveCategory, this._movieCategory, this._years]
    }

    loadAll = async () =>{
        await this._dicts.forEach(async (d)=>{
            await d.loadData()
            if(this.checkIfAllLoaded()){
                this.afterLoad()
            }
        })
    }

    afterLoad = () => {
        this._handler.do()
        coreupdate(UPDATE.DICTIONARY)
        // controllers().page.iptv.channelList.categorySelector.categoriesWasUpdated()
    }

    checkIfAllLoaded = () => {
        return this._dicts.find(d=>!d.loaded)===undefined
    }

    // get liveCategory(){
    //     return this._liveCategory
    // }

    // get movieCategory(){
    //     return this._movieCategory
    // }

    // get years(){
    //     return this._years
    // }

    get handler(){
        return this._handler
    }
}

// @ts-ignore
global.__app__ = global.__app__ || {};
// @ts-ignore
global.__app__.dictionary =
// @ts-ignore
global.__app__.dictionary || new Dictionaries();

export function dictionary(): Dictionaries {
  // @ts-ignore
  return global.__app__.dictionary;
}
