import { Model } from "../Base/Model";


class LoaderController extends Model{
    private _visible: boolean;
    private _canDoHide: boolean;
    private _shouldIDoHide: boolean;
    private _loaderRef: any
    constructor(){
        super()
        this._visible = true
        this._canDoHide = false
        this._shouldIDoHide = true
        this._loaderRef = null
    }

    get loader(){
        return this._loaderRef
    }
    loaderRef = (ref: any) => {
        this._loaderRef = ref
    }
    startAnimation = () => {
        if(this._loaderRef === null){
            return
        }
        try{
            this._loaderRef.startAnimation()
        } catch(e){

        }
    }

    get visible() {
        return this._visible
    }

    setVisible = (visible: boolean) => {
        if(this._visible === visible){
            return
        }
        this._visible = visible
        this.updateMe()
    }

    show = () => { 
        // this._canDoHide = false
        // this._shouldIDoHide = false
        // this.startAnimation()
        this.setVisible(true) 
    }
    hide = () => {
        // if(this._canDoHide && this._shouldIDoHide){
            this.setVisible(false) 
        // } else { 
        //     this._shouldIDoHide = true
        // }
    }
    toggle = () => { this.setVisible(!this._visible) }

    updateCanDoHide = (bool: boolean) => {
        if(this._canDoHide === bool){
            return
        }
        this._canDoHide = bool
    }
    loadingCanDo = (bool: boolean) => {
        if(this._canDoHide || !this._shouldIDoHide){
            return false
        }
        this.updateCanDoHide(bool)
        this.hide()
        return !this._visible
    }
}

export { LoaderController }