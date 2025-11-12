import { Model } from "../../Base/Model";
import type {langRowType, langs} from "../../Constants/AppSettings";
import { controllers } from "../Controllers";



class Lang extends Model {

    private _vals: Array<langRowType>;
    private _name: langs;
    private _selected: boolean

    constructor(name: langs){
        super()
        this._vals = []
        this._name = name
        this._selected = false
    }

    get selected(){
        return this._selected
    }
    setSelected = (bool: boolean) => {
        if(this._selected === bool){
            return
        }
        this._selected = bool
        this.updateMe()
    }

    click = () => {
        // console.error("CLICKED", this.name)
        if(controllers().media.w < 1024){
            controllers().language.setLanguage(this.name)
        } else {
            // controllers().language.toggleSelected(this.name)
        }
    }

    get name(){
        return this._name
    }

    r = (key: string) => {
        // @ts-ignore
        return this._vals[key]
    }

    get vals(){
        return this._vals
    }

    set vals(arr){
        this._vals = arr
        this.initVals()
    }

    initVals = () => {
        // @ts-ignore
        var newVals = []
        this._vals.forEach(v => {
            const key = Object.keys(v)[0]
            const val = v[key]
            // @ts-ignore
            newVals[key] = val
        })
        // @ts-ignore
        this._vals = newVals
        // console.log("this._vals", this._vals)
    }
}

export { Lang }