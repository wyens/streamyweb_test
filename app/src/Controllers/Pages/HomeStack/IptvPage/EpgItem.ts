import { Model } from "../../../../Base/Model";
import { parseBetweens, timeParse } from "../../../../Helpers/DateTime";


export type epgItemModel = {
    programme_time: string;
    programme_name: string;
    programme_start_end_time: string;
    // scroll?: (y:number,x:number)=>void
}

class EpgItem extends Model {
    private _model: epgItemModel
    private _selected: boolean = false
    private _timeCost: number
    private _isMidnight: boolean = false;
    private _timeDifference: number;
    private _section: number;
    private _disabled: boolean = false
    constructor(model: epgItemModel, section: number, timeDif: number = 0){
        super()
        this._model = model
        this._section = section
        this._isMidnight = false
        this._timeDifference = timeDif
        this._timeCost = timeParse(this._model.programme_time)
        this.loadTimeWithDifference()
    }

    get data(){
        return this._model
    }

    setBetweens = (betweens: any) => {
        this._model.programme_start_end_time = betweens
    }

    makeDisabled = (bool: boolean) => {
        if(this._disabled === bool){
            return
        }
        this._disabled = bool
        this.updateMe()
    }
    get disabled(){
        return this._disabled
    }

    get isMidnight(){
        return this._isMidnight
    }
    set isMidnight(val){
        this._isMidnight = val
    }

    get timeCost(){
        return timeParse(this._model.programme_time)
    }

    get timeCostEnd(){
        const betweens = parseBetweens(this._model.programme_start_end_time)
        if(betweens){
            return timeParse(betweens[1])
        } 
        return this.timeCost
    }

    get section(){
        return this._section
    }

    get time(){
        return this._model.programme_time
    }
    get name(){
        return this._model.programme_name
    }
    get betweens(){
        return this._model.programme_start_end_time
    }

    get betweenItems(){
        return parseBetweens(this._model.programme_start_end_time)
    }
    get selected(){
        return this._selected
    }
    setSelected = (bool : boolean) => {
        if(this._selected === bool){
            return
        }
        this._selected = bool
        this.updateMe()
    }

    loadTimeWithDifference = () => {
        if(this._timeDifference === 0){
            return
        }
        try{
            this._model.programme_time = this.reparseTimeWithTimeZone(this._model.programme_time);
            if(typeof this._model.programme_start_end_time !== 'string' || this._model.programme_start_end_time === ""){
                return
            }
            const diff = this._model.programme_start_end_time.split('-');
            const left = this.reparseTimeWithTimeZone(diff[0].trim());
            const right = this.reparseTimeWithTimeZone(diff[1].trim());
            this._model.programme_start_end_time = `${left} - ${right}`;
        } catch(e){
            console.error(e)
        }
    }

    reparseTimeWithTimeZone = (time: string) => {
        const times = time.split(':')
        const hours = parseInt(times[0])
        var hoursWithDifference = hours+this._timeDifference
        if(hoursWithDifference>23){
            hoursWithDifference = hoursWithDifference-24
        } else if(hoursWithDifference<0){
            hoursWithDifference = hoursWithDifference+24
        }
        var leftStr = hoursWithDifference<10 ? `0${hoursWithDifference}` : `${hoursWithDifference}`
        return `${leftStr ? leftStr : ""}:${times[1] ? times[1]:""}`
    }
}

export { EpgItem }
