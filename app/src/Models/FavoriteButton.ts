import { UserDataProvider, loadData } from "../Base/UserDataProvider";
import { controllers } from "../Controllers/Controllers";
import { checkFavoritesOneBody, makeFavoritesOneBody } from "../DataTypes/BaseResponse";
import { idType } from "../DataTypes/BaseTypes";
import { favoritesType } from "../DataTypes/dataTypes";


export type favoriteButtonType = {
    id: idType;
    type: favoritesType;
    selected: boolean;
    customStyle?: string;
    customImage?: any
}

class FavoriteButton {
    private _model: favoriteButtonType
    private _requested: boolean
    private _ref: any
    constructor(model: favoriteButtonType){
        this._model = model
        this._requested = false
        this.set = this.set.bind(this)
        this.setSelected = this.setSelected.bind(this)
        this.updateMe = this.updateMe.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    clear = () => {
        this._requested = false
        this._model.selected = false
        this.updateMe()
    }

    get id(){
        return this._model.id
    }

    update_id(id: idType) {
        this._model.id = id
    }

    updateAndLoad = (id: idType) => {
        this.update_id(id)
        this.checkIsFavorite()
    }
    get type(){
        return this._model.type
    }

    changeType(type: favoritesType){
        this._model.type = type
    }

    get selected(){
        return this._model.selected
    }

    get requested(){
        return this._requested
    }

    setRequested = (bool: boolean, update:boolean = true) => {
        if(this._requested === bool){
            return
        }
        this._requested = bool
        if(update) {
            this.updateMe()
        }
    }

    get customStyle(){
        return this._model.customStyle
    }

    get customImage(){
        return this._model.customImage
    }

    set(ref: any){
        this._ref = ref
    }

    setSelected(bool:boolean){
        if(this._model.selected === bool){
            return
        }
        this._model.selected = bool
        this.updateMe()
    }

    updateMe(){
        try{
            this._ref.update()
        } catch(e){
            console.log('favorite: ref doest set')
        }
    }

    onClick(){
        // console.log('clicked')
        // this.setSelected(!this.selected)
        this.makeFavoriteRequest()
    }

    checkIsFavorite = async () => {
        const userToken = controllers().auth.userToken
        if(userToken === null){
            // console.error("User token is null")
            return 
        }
        const body:checkFavoritesOneBody = {
            userToken: userToken||"",
            movie_hash: this.id||""
        }
        const response = await loadData(UserDataProvider.checkFavoritesOne, body);

        // console.error("response", response)
        if(response.statusCode !== 200){
            console.error('Check favorites is failed')
            return
        }

        const {status} = response.data

        this.setSelected(status)
    }

    makeFavoriteRequest = async () => {
        const userToken = controllers().auth.userToken
        if(userToken === null){
            // console.error("User token is null")
            return 
        }
        this.setRequested(true)
        const body:makeFavoritesOneBody = {
            userToken: userToken||"",
            movie_hash: this.id||"",
            stream_type: this.type
        }

        // console.error("BODY", body)
        const response = await loadData(UserDataProvider.makeFavorite, body);

        if(response.statusCode !== 200){
            console.error('make favorites is failed')
            return
        }

        const {favourites_status} = response.data
        this.setSelected(favourites_status)
        this.setRequested(false)
    }
}

export { FavoriteButton }