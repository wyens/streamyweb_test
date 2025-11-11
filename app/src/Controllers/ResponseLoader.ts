import { Model } from "../Base/Model";


class ResponseLoader extends Model {

    private _visible: boolean;
    private _loaderRef: any;
    private _stopLoad: boolean;
    private _needHide: boolean;

    constructor(){
        super()
        this._visible = false;
        this._loaderRef = null;
        this._stopLoad = false;
        this._needHide = false;
    }

    get visible(){
        return this._visible
    }

    setVisible = (bool: boolean) => {
        if(this._visible === bool){
            return
        }
        this._visible = bool
        this.updateMe()
    }

    show = () => {
        this.setVisible(true)
        this.startAnima()
    }
    hide = (immidiatly: boolean = false) => {
        if(immidiatly){
            this.setVisible(false)
            this.stopAnima()
        } else {
            this.stopAnima()
        }
    }

    setLoader = (ref: any) => {
        this._loaderRef = ref
    }

    startAnima = () => { 
        if(this._loaderRef){
            this._stopLoad = false
            this._needHide = false
            this._loaderRef.startMe();
        }
    }
    stopAnima = () => {
        if(this._loaderRef){
            this._needHide = true
            this._stopLoad = true
        }
    }

    loaderCanDo = (bool: boolean) => {
        if(bool && this._needHide){
            this.setVisible(false)
        }
        return this._stopLoad
    } 
}

export { ResponseLoader }