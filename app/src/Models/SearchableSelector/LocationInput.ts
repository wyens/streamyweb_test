import { Model } from "../../Base/Model";
import { controllers } from "../../Controllers/Controllers";
import { LocationItem } from "./LocationItem";

type locationInputModel = {
    onChooseLocation?: (location: any)=>void
}
class LocationInput extends Model {
    private _model: locationInputModel
    private _inputRef: any
    private _selectedLocation: LocationItem|null 

    constructor(model: locationInputModel){
        super()
        this._model = model
        this._inputRef = null
        this._selectedLocation = null
    }

    setInputRef = (ref: any) => {
        this._inputRef = ref
    }

    setValue = (value: string) => {
        if(this._inputRef === null){
            return
        }
        try{
            this._inputRef.setValue(value)
        } catch(e){

        }
    }
    
    locationCallback = (item: LocationItem) => {
        this.setValue(item.name)
        this._selectedLocation = item
        if(this._model.onChooseLocation){
            this._model.onChooseLocation(item.name)
        }

    }

    onPressInput = () => {
        controllers().modals.location.show(this.locationCallback)
    }

}

export { LocationInput }