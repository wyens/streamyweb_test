import { Model } from "../../Base/Model";
import type {idType} from "../../DataTypes/BaseTypes";
import { makeid } from "../../Helpers/actions";

type listItemModel = {
    id: idType;
    emptier?: boolean;
}

class ListItem extends Model {
    private _id: idType
    private _model: listItemModel
    private _needToUpdate: boolean
    private _visible: boolean;
    constructor(model: listItemModel){
        super()
        this._model = model
        this._id = model.id || makeid(16)
        this._needToUpdate = false
        this._visible = true
    }

    setVisible = (bool: boolean) =>{ 
        if(this._visible === bool){
            return
        }
        this._visible = bool
        this.updateMe()
    }

    show = () => {
        if(this._visible){
            return
        }
        this._visible = true
        this.updateMe()
    }
    hide = () => {
        if(!this._visible){
            return
        }
        this._visible = false 
        this.updateMe()
    }

    get emptier(){
        return this._model.emptier
    }
    get visible(){
        return this._visible
    }

    get id(){
        return this._id
    }

    get model(){
        return this._model
    }

    set model(value){
        this._model = value
    }

    update = (model: any, update: boolean = true) => {
        const lastModel = {...this._model}
        this._model = model
        this.chechForUpdate(lastModel, model)
        this.updateId()
        if(update && this._needToUpdate){
            this.updateMe()
            this._needToUpdate = false
        }
    }

    chechForUpdate = (lastModel:any, model: any) => {
        Object.keys(lastModel).forEach(key=> {
            if(lastModel[key] !== model[key]){
                this._needToUpdate = true
            }
        })
        if(Object.keys(lastModel).length !== Object.keys(model).length){
            this._needToUpdate = true
        }
    }

    updateId = () => {
        this._id = this._model.id || makeid(16)
    }
}

export { ListItem }