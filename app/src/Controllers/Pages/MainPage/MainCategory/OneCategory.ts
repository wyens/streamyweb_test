
import { MainCategory } from "./MainCategory";
import {Model} from "~/src/Base/Model";
import {makeid} from "~/src/Helpers/actions";


export type oneCategoryType = {
    id: string;
    genre: string;
    isFocused?: boolean;
    onFocus?: (layoutLeft: any)=>void;
    onSelect?: (item:OneCategory) =>void 
    onBlur?: ()=>void;
    controlCategory: MainCategory;
}

class OneCategory extends Model {
    private _data: oneCategoryType
    private _focused: boolean = false;
    private _layout: any = null;
    private _selected: boolean = false;
    private _keyId:any = "";
    private _touchableRef: any

    constructor(model: oneCategoryType){
        super()
        this._keyId = makeid(8)
        this._data = model
    }

    get keyId(){
        return this._keyId
    }

    get touchableRef(){
        return this._touchableRef
    }

    setTouchableRef = (ref: any) => {
        this._touchableRef = ref
    }

    get id(){
        return this._data.id
    }

    get genre(){
        return this._data.genre
    }

    get focused(){
        return this._focused
    }

    get selected(){
        return this._selected
    }

    setSelected(bool: boolean){
        if(this._selected === bool){
            return
        }
        this._selected = bool
        this.updateMe()
    }

    setFocused = (focused:boolean) => {
        if(this._focused === focused){
            return
        }
        if(focused && this._data.onSelect){
            this._data.onSelect(this)
        }
        this._focused = focused
        this.updateMe()
    }

    onFocusModel = () => {
        if(this._data.onFocus){
            this._data.onFocus(this._layout)
        }
    }

    onBlurModel = () => {
        if(this._data.onBlur){
            this._data.onBlur()
        }
    }

    onFocusItem = () =>{ 
        this.setFocused(true)
        this.setSelected(true)
        this.onFocusModel()
    }
    onBlurItem = () => { 
        this.setFocused(false)
        this.onBlurModel()
    }

    setLayout = (event:any) => {
        // const { x, y, width, height } = event.nativeEvent.layout;
        // console.error("SET LAYOUT ON RENDER", event)
        if(event.nativeEvent.layout){
            this._layout = event.nativeEvent.layout
        }
    }
}

export { OneCategory }