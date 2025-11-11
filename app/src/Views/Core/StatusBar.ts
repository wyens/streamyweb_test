import { Model } from "../../Base/Model";


class StatusBarController extends Model {
    private _visible: boolean = true
    private _inFullScreen: boolean = false;
    get hidden(){
        return !this._visible
    }

    setVisible = (bool: boolean) => {
        if(this._visible === bool){
            return
        }
        this._visible = bool
        this.updateMe()
    }
    setInFullScreen = (bool: boolean) => {
        if(this._inFullScreen === bool){
            return
        }
        this._inFullScreen = bool
        this.updateMe()
    }
    get inFullScreen(){
        return this._inFullScreen
    }
}

export { StatusBarController }