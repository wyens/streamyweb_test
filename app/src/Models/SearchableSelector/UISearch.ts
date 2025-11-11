import { Model } from "../../Base/Model";
import { Timeout } from "../../Base/Timeout";
import { idType, locationDot } from "../../DataTypes/BaseTypes";
import { Input } from "../../Views/Components/InputItem";

type propsUISearch = { 
    onValueChange?: (value: string) => void
    inputIsEmptyHandler?: ()=>void
}

class UISearch extends Model {
    private _model: propsUISearch;
    private _currentItem: string = "Near me";
    private _currentDot: locationDot|null = null;
    private _isSearchableNow: boolean = false;
    private _searchInputRef: any;
    private _searchingTimeout: Timeout = new Timeout(1000)
    private _inputValue: any = ""


    constructor(model: propsUISearch = {}){
        super()
        this._model = model
    }

    setInputRef = (ref: any) => {
        this._searchInputRef = ref
    }

    onInputValueChange = (e: idType|Input) => {
        const { _searchingTimeout, loadWithInputData, clearData} = this
        _searchingTimeout.clear()
        this._inputValue = e
        if(this._inputValue === ""){
            clearData()
            return
        }
        _searchingTimeout.set(loadWithInputData)
    }

    clearData = () => {
        if(this._model.inputIsEmptyHandler){
            this._model.inputIsEmptyHandler()
        }
    }

    loadWithInputData = () => {
        if(this._model.onValueChange){
            this._model.onValueChange(this._inputValue)
        }
    }

    setSearchable = (bool: boolean) => {
        if(this._isSearchableNow === bool){
            return
        }
        this._isSearchableNow = bool
        this.updateMe()
    }
    get isSearchableNow(){
        return this._isSearchableNow
    }
    get currentItem(){
        return this._currentItem
    }

    setCurrentItem = (val: string) => {
        this._currentItem = val
    }

    get currentDot(){
        return this._currentDot
    }

    focus = () => {
        if(this._searchInputRef.focus){
            this._searchInputRef.focus()
        }
    }
}

export { UISearch }