import { Model } from "../../Base/Model";
import { Timeout } from "../../Base/Timeout";
import { idType, onChangeInput } from "../../DataTypes/BaseTypes";
import { Input } from "../../Views/Components/InputItem";
import { List } from "../List/List";

class SearchableSelector extends Model {
    private _list: List
    private _lastQuery: string;
    private _sQuery: string;
    private _searchTimeout: Timeout;
    constructor(list: List){
        super()
        this._list = list
        this._sQuery = ""
        this._lastQuery = ""
        this._searchTimeout = new Timeout(300)
    }

    get list(){
        return this._list
    }

    onSearchChange = (sQuery: idType|Input) => {
        if(typeof sQuery !== "string"){
            return
        }
        this._searchTimeout.clear()
        this._sQuery = sQuery
        this._searchTimeout.set(this.doSearching)
    }

    doSearching = () => {
        if(this._lastQuery === this._sQuery){
            return
        }
        this._lastQuery = this._sQuery
        this._list.doSearch(this._sQuery)
    }

}

export { SearchableSelector }