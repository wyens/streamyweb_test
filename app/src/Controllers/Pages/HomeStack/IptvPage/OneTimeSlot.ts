import { Model } from "../../../../Base/Model";
import { timeParse } from "../../../../Helpers/DateTime";
import { EpgItem } from "./EpgItem";

export type timeSlotModel = {
    allEpgs?: Array<EpgItem>;
    title?:string;
    endTitle?:string;
    type?:string;
    timeCost?:any;
    timeCostEnd?:any;
    channel?:any;
    slotTakes?:number;
}

class OneTimeSlot extends Model {
    private _model: timeSlotModel
    // private _slotTakes: number = 1;
    private _slotItems: Array<EpgItem> = []

    constructor(model:timeSlotModel){
        super()
        this._model = model
        this._slotItems = model.allEpgs || []
    }

    get data(){
        return this._model
    }

    get type(){
        return this._model.type
    }

    setTitle = (title:any) => { 
        if(this._model.title === title){
            return
        }
        this._model.title = title
        this.updateMe()
    }

    get title(){
        return this._model.title
    }

    get allEpgs(){
        return this._model.allEpgs
    }

    get channel(){
        return this._model.channel
    }

    get slotTakes(){
        return this._model.slotTakes
    }
    set slotTakes(val){
        this._model.slotTakes = val
    }

    get firstEpgItem(): EpgItem | undefined {
        return this._slotItems.length > 0 ? this._slotItems[0] : undefined;
    }

    get lastEpgItem(): EpgItem | undefined {
        return this._slotItems.length > 0 ? this._slotItems[this._slotItems.length - 1] : undefined;
    }

    get timeCost(){
        return this._model.timeCost
    }

    get timeCostEnd(){
        return this._model.timeCostEnd
    }

    focusedTimeSlot = () => {
        this.channel!.focusedType()
    }

}

export { OneTimeSlot }